import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ShippingOption {
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

// ---------------------------------------------------------------------------
// Config helpers — leer variables de entorno directamente (sin @t3-oss/env-nextjs)
// ---------------------------------------------------------------------------

function envNum(name: string, fallback: number): number {
  const val = process.env[name];
  if (!val || isNaN(Number(val))) return fallback;
  return Number(val);
}

function envStr(name: string, fallback = ""): string {
  return process.env[name]?.trim() || fallback;
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
      if (!isNaN(from) && !isNaN(to) && numericZip >= from && numericZip <= to) {
        return true;
      }
    } else {
      const single = parseInt(part, 10);
      if (!isNaN(single) && numericZip === single) return true;
    }
  }
  return false;
}

/**
 * Determina la zona de envío según los rangos configurados en las variables de entorno.
 * - LOCAL:    el CP cae en SHIPPING_LOCAL_ZIPS   (ej: "1000-1499")
 * - REGIONAL: el CP cae en SHIPPING_REGIONAL_ZIPS (ej: "1600-1999")
 * - NACIONAL: cualquier otro CP
 */
function getShippingZone(zip: string): ShippingZone {
  const match = zip.match(/\d+/);
  if (!match) return "NACIONAL";
  const numericZip = parseInt(match[0], 10);

  const localRanges = envStr("SHIPPING_LOCAL_ZIPS", "1000-1499");
  const regionalRanges = envStr("SHIPPING_REGIONAL_ZIPS", "1600-1999");

  if (isZipInRange(numericZip, localRanges)) return "LOCAL";
  if (isZipInRange(numericZip, regionalRanges)) return "REGIONAL";
  return "NACIONAL";
}

// ---------------------------------------------------------------------------
// Package Stats
// ---------------------------------------------------------------------------

/**
 * Calcula el peso y volumen total del pedido desde la DB.
 * Si el producto no tiene dimensiones cargadas, usa defaults seguros.
 */
async function getPackageStats(items: RequestBody["items"]) {
  const ids = items.map((i) => i.productId);
  const dbProducts = await prisma.product.findMany({ where: { id: { in: ids } } });

  let totalWeight = 0;
  let totalVolume = 0;

  for (const item of items) {
    const p = dbProducts.find((d) => d.id === item.productId) as Record<string, unknown> | undefined;
    // Los campos de dimensiones son opcionales: se agregan al schema cuando el cliente los necesite.
    const weight: number = (p && typeof p.weight === "number") ? p.weight : 0.3;
    const height: number = (p && typeof p.height === "number") ? p.height : 10;
    const width: number  = (p && typeof p.width === "number")  ? p.width  : 10;
    const depth: number  = (p && typeof p.depth === "number")  ? p.depth  : 10;

    totalWeight += weight * item.quantity;
    totalVolume += height * width * depth * item.quantity;
  }

  return { totalWeight, totalVolume };
}

// ---------------------------------------------------------------------------
// Admin Alert
// ---------------------------------------------------------------------------

/** Envía un email de alerta al admin cuando las 3 APIs de envío fallan simultáneamente. */
async function notifyAdminShippingFailure(destinationZip: string) {
  const adminEmail = envStr("SHIPPING_ADMIN_EMAIL") || envStr("SMTP_FROM") || envStr("SMTP_USER");
  if (!adminEmail) return;

  await sendEmail({
    to: adminEmail,
    subject: "⚠️ Alerta: Fallo en el módulo de envíos — Beauté Divine Espace",
    html: `
      <h2>Fallo crítico en el cálculo de tarifas de envío</h2>
      <p>Ninguno de los proveedores (Andreani, Correo Argentino, OCA) pudo responder correctamente.</p>
      <p><strong>CP de destino que disparó el error:</strong> ${destinationZip}</p>
      <p>Por favor verificá el estado de las APIs y los tokens en las variables de entorno de Vercel.</p>
      <hr/>
      <p style="color:#999;font-size:12px;">Mensaje automático — Módulo de Envíos · Beauté Divine Espace</p>
    `,
  }).catch((err) => {
    console.error("[shipping] No se pudo enviar el email de alerta al admin:", err);
  });
}

// ---------------------------------------------------------------------------
// Fallback Providers — Tarifas fijas (modo FIXED o HYBRID)
// ---------------------------------------------------------------------------

function getAndreaniFallback(zone: ShippingZone): ShippingOption {
  const cost =
    zone === "LOCAL"    ? envNum("SHIPPING_ANDREANI_LOCAL", 4500)
    : zone === "REGIONAL" ? envNum("SHIPPING_ANDREANI_REGIONAL", 6500)
    :                       envNum("SHIPPING_ANDREANI_NACIONAL", 9800);
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
    zone === "LOCAL"    ? envNum("SHIPPING_CORREO_LOCAL", 4000)
    : zone === "REGIONAL" ? envNum("SHIPPING_CORREO_REGIONAL", 5500)
    :                       envNum("SHIPPING_CORREO_NACIONAL", 8500);
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
    zone === "LOCAL"    ? envNum("SHIPPING_OCA_LOCAL", 4200)
    : zone === "REGIONAL" ? envNum("SHIPPING_OCA_REGIONAL", 6000)
    :                       envNum("SHIPPING_OCA_NACIONAL", 9000);
  return {
    provider: "OCA",
    type: "Estándar a Domicilio",
    cost,
    estimatedDelivery:
      zone === "LOCAL" ? "1 a 3 días hábiles" : zone === "REGIONAL" ? "2 a 4 días hábiles" : "3 a 6 días hábiles",
  };
}

// ---------------------------------------------------------------------------
// Real API Providers
// ---------------------------------------------------------------------------

async function getAndreaniRealOption(
  destinationZip: string, originZip: string, totalWeight: number, totalVolume: number
): Promise<ShippingOption | null> {
  const apiUrl = envStr("SHIPPING_ANDREANI_API_URL");
  const apiKey = envStr("SHIPPING_ANDREANI_API_KEY");
  if (!apiUrl || !apiKey) return null;

  try {
    const res = await fetch(`${apiUrl}/v1/tarifas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey },
      body: JSON.stringify({
        cpOrigen: originZip,
        cpDestino: destinationZip,
        bultos: [{ pesoPorBulto: totalWeight, volumenPorBulto: totalVolume }],
        contrato: envStr("SHIPPING_ANDREANI_CONTRATO", "AND00001"),
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
  const apiUrl = envStr("SHIPPING_CORREO_API_URL");
  const apiKey = envStr("SHIPPING_CORREO_API_KEY");
  if (!apiUrl || !apiKey) return null;

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
  const apiUrl = envStr("SHIPPING_OCA_API_URL");
  const apiKey = envStr("SHIPPING_OCA_API_KEY");
  if (!apiUrl || !apiKey) return null;

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

export async function POST(req: Request) {
  try {
    const body: RequestBody = await req.json();
    const { destinationZip, items } = body;

    if (!destinationZip || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing destinationZip or items" }, { status: 400 });
    }

    // Kill switch global: SHIPPING_COST >= 0 devuelve un único precio fijo (0 = Gratis).
    // Compatible con el sistema existente de AppSetting / getShippingCost().
    const globalCost = envNum("SHIPPING_COST", -1);
    if (globalCost >= 0) {
      return NextResponse.json({
        options: [{
          provider: globalCost === 0 ? "Envío Gratis" : "Envío Estándar",
          type: "A domicilio",
          cost: globalCost,
          estimatedDelivery: "3 a 5 días hábiles",
        }],
      });
    }

    const mode = envStr("SHIPPING_MODE", "FIXED");
    const originZip = envStr("SHIPPING_ORIGIN_ZIP", "1640"); // San Isidro por defecto
    const zone = getShippingZone(destinationZip);
    const { totalWeight, totalVolume } = await getPackageStats(items);

    let andreaniOption: ShippingOption | null = null;
    let correoOption: ShippingOption | null = null;
    let ocaOption: ShippingOption | null = null;

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
          return NextResponse.json(
            { error: "No pudimos calcular las tarifas de envío en este momento. Por favor intentá nuevamente más tarde." },
            { status: 503 }
          );
        }
        return NextResponse.json({ options: validOptions });
      }

      // HYBRID: inyectar tarifa fija de zona para proveedores que hayan fallado.
      if (!andreaniOption) andreaniOption = getAndreaniFallback(zone);
      if (!correoOption)   correoOption   = getCorreoFallback(zone);
      if (!ocaOption)      ocaOption      = getOcaFallback(zone);
    }

    return NextResponse.json({ options: [andreaniOption, correoOption, ocaOption] });
  } catch (error) {
    console.error("[shipping] Handler error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
