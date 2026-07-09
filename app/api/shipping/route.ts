import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ShippingOption {
  provider: string;
  type: string;
  cost: number;
  estimatedDelivery: string;
}

interface RequestBody {
  destinationZip: string;
  items: { productId: string; quantity: number }[];
}

type ShippingZone = "LOCAL" | "REGIONAL" | "NACIONAL";
type ShippingMode = "FIXED" | "API_ONLY" | "HYBRID";

// ---------------------------------------------------------------------------
// Config helpers — sin fallbacks. Falla rápido con mensaje claro si falta algo.
// ---------------------------------------------------------------------------

function requireEnvNum(name: string): number {
  const val = process.env[name];
  if (!val || isNaN(Number(val))) {
    throw new Error(`❌ Variable de entorno faltante o inválida: "${name}". Configurala en Vercel.`);
  }
  return Number(val);
}

function requireEnvStr(name: string): string {
  const val = process.env[name]?.trim();
  if (!val) {
    throw new Error(`❌ Variable de entorno faltante: "${name}". Configurala en Vercel.`);
  }
  return val;
}

function optionalEnvStr(name: string): string | undefined {
  return process.env[name]?.trim() || undefined;
}

// ---------------------------------------------------------------------------
// ZIP Range Helpers
// ---------------------------------------------------------------------------

/**
 * Parsea una cadena de rangos/listados de CPs.
 * Soporta rangos ("1000-1499") y listas separadas por coma ("5000,5001").
 */
function isZipInRange(numericZip: number, rangeString: string): boolean {
  const parts = rangeString.split(",").map((s) => s.trim());
  for (const part of parts) {
    if (part.includes("-")) {
      const [from, to] = part.split("-").map((n) => parseInt(n.trim(), 10));
      if (!isNaN(from) && !isNaN(to) && numericZip >= from && numericZip <= to) return true;
    } else {
      const single = parseInt(part, 10);
      if (!isNaN(single) && numericZip === single) return true;
    }
  }
  return false;
}

/**
 * Determina la zona de envío según los rangos configurados en Vercel.
 * SHIPPING_LOCAL_ZIPS y SHIPPING_REGIONAL_ZIPS son obligatorias.
 */
function getShippingZone(zip: string): ShippingZone {
  const match = zip.match(/\d+/);
  if (!match) return "NACIONAL";
  const numericZip = parseInt(match[0], 10);

  const localRanges    = requireEnvStr("SHIPPING_LOCAL_ZIPS");
  const regionalRanges = requireEnvStr("SHIPPING_REGIONAL_ZIPS");

  if (isZipInRange(numericZip, localRanges))    return "LOCAL";
  if (isZipInRange(numericZip, regionalRanges)) return "REGIONAL";
  return "NACIONAL";
}

// ---------------------------------------------------------------------------
// Package Stats
// ---------------------------------------------------------------------------

async function getPackageStats(items: RequestBody["items"]) {
  const ids = items.map((i) => i.productId);
  const dbProducts = await prisma.product.findMany({ where: { id: { in: ids } } });

  let totalWeight = 0;
  let totalVolume = 0;

  for (const item of items) {
    const p = dbProducts.find((d) => d.id === item.productId) as Record<string, unknown> | undefined;
    // Los campos de dimensiones son opcionales: se agregan al schema cuando el cliente active modo API.
    const weight: number = (p && typeof p.weight === "number") ? p.weight : 0;
    const height: number = (p && typeof p.height === "number") ? p.height : 0;
    const width: number  = (p && typeof p.width  === "number") ? p.width  : 0;
    const depth: number  = (p && typeof p.depth  === "number") ? p.depth  : 0;

    totalWeight += weight * item.quantity;
    totalVolume += height * width * depth * item.quantity;
  }

  return { totalWeight, totalVolume };
}

// ---------------------------------------------------------------------------
// Admin Alert
// ---------------------------------------------------------------------------

async function notifyAdminShippingFailure(destinationZip: string) {
  // SHIPPING_ADMIN_EMAIL es opcional; si no está se usa SMTP_FROM (que sí es requerido).
  const adminEmail = optionalEnvStr("SHIPPING_ADMIN_EMAIL") ?? requireEnvStr("SMTP_FROM");

  await sendEmail({
    to: adminEmail,
    subject: "⚠️ Alerta: Fallo en el módulo de envíos — Beauté Divine Espace",
    html: `
      <h2>Fallo crítico en el cálculo de tarifas de envío</h2>
      <p>Ninguno de los proveedores (Andreani, Correo Argentino, OCA) pudo responder correctamente.</p>
      <p><strong>CP de destino:</strong> ${destinationZip}</p>
      <p>Verificá el estado de las APIs y los tokens en Vercel.</p>
      <hr/>
      <p style="color:#999;font-size:12px;">Mensaje automático — Módulo de Envíos · Beauté Divine Espace</p>
    `,
  }).catch((err) => {
    console.error("[shipping] No se pudo enviar el email de alerta al admin:", err);
  });
}

// ---------------------------------------------------------------------------
// Tarifas fijas por zona (solo modo FIXED o HYBRID)
// Todas las variables son obligatorias. Si falta alguna, el error es claro.
// ---------------------------------------------------------------------------

function getAndreaniFallback(zone: ShippingZone): ShippingOption {
  const cost =
    zone === "LOCAL"     ? requireEnvNum("SHIPPING_ANDREANI_LOCAL")
    : zone === "REGIONAL" ? requireEnvNum("SHIPPING_ANDREANI_REGIONAL")
    :                       requireEnvNum("SHIPPING_ANDREANI_NACIONAL");
  return {
    provider: "Andreani",
    type: "Express Delivery",
    cost,
    estimatedDelivery:
      zone === "LOCAL" ? "1 a 2 días hábiles" : zone === "REGIONAL" ? "2 a 3 días hábiles" : "3 a 5 días hábiles",
  };
}

function getCorreoFallback(zone: ShippingZone): ShippingOption {
  const cost =
    zone === "LOCAL"     ? requireEnvNum("SHIPPING_CORREO_LOCAL")
    : zone === "REGIONAL" ? requireEnvNum("SHIPPING_CORREO_REGIONAL")
    :                       requireEnvNum("SHIPPING_CORREO_NACIONAL");
  return {
    provider: "Correo Argentino",
    type: "Clásico a Domicilio",
    cost,
    estimatedDelivery:
      zone === "LOCAL" ? "2 a 4 días hábiles" : zone === "REGIONAL" ? "3 a 5 días hábiles" : "4 a 7 días hábiles",
  };
}

function getOcaFallback(zone: ShippingZone): ShippingOption {
  const cost =
    zone === "LOCAL"     ? requireEnvNum("SHIPPING_OCA_LOCAL")
    : zone === "REGIONAL" ? requireEnvNum("SHIPPING_OCA_REGIONAL")
    :                       requireEnvNum("SHIPPING_OCA_NACIONAL");
  return {
    provider: "OCA",
    type: "Estándar a Domicilio",
    cost,
    estimatedDelivery:
      zone === "LOCAL" ? "1 a 3 días hábiles" : zone === "REGIONAL" ? "2 a 4 días hábiles" : "3 a 6 días hábiles",
  };
}

// ---------------------------------------------------------------------------
// APIs de proveedores en tiempo real
// ---------------------------------------------------------------------------

async function getAndreaniRealOption(
  destinationZip: string, originZip: string, totalWeight: number, totalVolume: number
): Promise<ShippingOption | null> {
  const apiUrl = requireEnvStr("SHIPPING_ANDREANI_API_URL");
  const apiKey = requireEnvStr("SHIPPING_ANDREANI_API_KEY");

  try {
    const res = await fetch(`${apiUrl}/v1/tarifas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        cpOrigen: originZip,
        cpDestino: destinationZip,
        bultos: [{ pesoPorBulto: totalWeight, volumenPorBulto: totalVolume }],
        contrato: requireEnvStr("SHIPPING_ANDREANI_CONTRATO"),
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const t = data.tarifas?.[0];
    if (!t) return null;
    return {
      provider: "Andreani",
      type: t.modalidad ?? "Express Delivery",
      cost: Math.round(t.tarifa ?? t.precio),
      estimatedDelivery: t.plazoEntrega ? `${t.plazoEntrega} días hábiles` : "2 a 4 días hábiles",
    };
  } catch (err) {
    console.error("[shipping] Andreani API error:", err);
    return null;
  }
}

async function getCorreoRealOption(
  destinationZip: string, originZip: string, totalWeight: number, totalVolume: number
): Promise<ShippingOption | null> {
  const apiUrl = requireEnvStr("SHIPPING_CORREO_API_URL");
  const apiKey = requireEnvStr("SHIPPING_CORREO_API_KEY");

  try {
    const res = await fetch(`${apiUrl}/api/v1/cotizar`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ cp_origen: originZip, cp_destino: destinationZip, peso: totalWeight, volumen: totalVolume }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.costo) return null;
    return {
      provider: "Correo Argentino",
      type: data.servicio ?? "Clásico a Domicilio",
      cost: Math.round(data.costo),
      estimatedDelivery: data.plazo ?? "3 a 5 días hábiles",
    };
  } catch (err) {
    console.error("[shipping] Correo Argentino API error:", err);
    return null;
  }
}

async function getOcaRealOption(
  destinationZip: string, originZip: string, totalWeight: number, totalVolume: number
): Promise<ShippingOption | null> {
  const apiUrl = requireEnvStr("SHIPPING_OCA_API_URL");
  const apiKey = requireEnvStr("SHIPPING_OCA_API_KEY");

  try {
    const res = await fetch(`${apiUrl}/epak_tracking/Oep_TrackEPak.asmx/Tarifar_Envio_Corporativo`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Token: apiKey },
      body: JSON.stringify({
        CodigoPostalOrigen: originZip,
        CodigoPostalDestino: destinationZip,
        PesoTotal: totalWeight,
        VolumenTotal: totalVolume,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.Precio) return null;
    return {
      provider: "OCA",
      type: data.Operativa ?? "Estándar a Domicilio",
      cost: Math.round(data.Precio),
      estimatedDelivery: data.PlazoEntrega ? `${data.PlazoEntrega} días hábiles` : "3 a 5 días hábiles",
    };
  } catch (err) {
    console.error("[shipping] OCA API error:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function calculateShippingOptions(destinationZip: string, items: { productId: string; quantity: number }[]): Promise<ShippingOption[]> {
  // Kill switch global: si SHIPPING_COST >= 0, devuelve precio único (0 = Gratis).
  const globalCostRaw = process.env.SHIPPING_COST;
  if (globalCostRaw !== undefined && !isNaN(Number(globalCostRaw)) && Number(globalCostRaw) >= 0) {
    const globalCost = Number(globalCostRaw);
    return [{
      provider: globalCost === 0 ? "Envío Gratis" : "Envío Estándar",
      type: "A domicilio",
      cost: globalCost,
      estimatedDelivery: "3 a 5 días hábiles",
    }];
  }

  // A partir de aquí todas las variables son obligatorias.
  const mode = requireEnvStr("SHIPPING_MODE") as ShippingMode;
  if (!["FIXED", "API_ONLY", "HYBRID"].includes(mode)) {
    throw new Error(`SHIPPING_MODE inválido: "${mode}". Valores válidos: FIXED, API_ONLY, HYBRID.`);
  }

  const originZip = requireEnvStr("SHIPPING_ORIGIN_ZIP");
  const zone = getShippingZone(destinationZip);
  const { totalWeight, totalVolume } = await getPackageStats(items);

  let andreaniOption: ShippingOption | null = null;
  let correoOption:   ShippingOption | null = null;
  let ocaOption:      ShippingOption | null = null;

  if (mode === "FIXED") {
    // Modo Fijo: usa la tabla LOCAL/REGIONAL/NACIONAL. No llama ninguna API.
    andreaniOption = getAndreaniFallback(zone);
    correoOption   = getCorreoFallback(zone);
    ocaOption      = getOcaFallback(zone);
  } else {
    // API_ONLY o HYBRID: cotiza en paralelo con los 3 proveedores.
    [andreaniOption, correoOption, ocaOption] = await Promise.all([
      getAndreaniRealOption(destinationZip, originZip, totalWeight, totalVolume),
      getCorreoRealOption(destinationZip, originZip, totalWeight, totalVolume),
      getOcaRealOption(destinationZip, originZip, totalWeight, totalVolume),
    ]);

    if (mode === "API_ONLY") {
      const validOptions = [andreaniOption, correoOption, ocaOption].filter(
        (o): o is ShippingOption => o !== null
      );
      if (validOptions.length === 0) {
        console.error("[shipping] API_ONLY: All APIs failed for destinationZip:", destinationZip);
        void notifyAdminShippingFailure(destinationZip);
        throw new Error("No pudimos calcular las tarifas de envío en este momento. Por favor intentá nuevamente más tarde.");
      }
      return validOptions;
    }

    // HYBRID: si una API falló, usar tarifa fija de zona (también obligatoria).
    if (!andreaniOption) andreaniOption = getAndreaniFallback(zone);
    if (!correoOption)   correoOption   = getCorreoFallback(zone);
    if (!ocaOption)      ocaOption      = getOcaFallback(zone);
  }

  return [andreaniOption, correoOption, ocaOption];
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { destinationZip, items } = body;

    if (!destinationZip || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing destinationZip or items" }, { status: 400 });
    }

    const options = await calculateShippingOptions(destinationZip, items);
    return NextResponse.json({ options });
  } catch (error) {
    console.error("[shipping] Handler error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("No pudimos calcular") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
