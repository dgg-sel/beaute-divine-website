import { NextResponse } from "next/server";
import { calculateShippingOptions, ShippingRequestBody } from "@/lib/shipping";
import { getClientIp, guard } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Este endpoint puede consultar las APIs de Andreani, OCA y Correo, que
    // tienen cuota o se cobran: sin límite, alguien te genera la factura sin
    // romper nada. Dos ventanas — la corta tolera al humano que corrige el CP
    // en el checkout, la larga corta al script que insiste todo el día.
    const ip = getClientIp(req);
    const limited = await guard([
      { key: `shipping:burst:${ip}`, limit: 20, windowSec: 60 },
      { key: `shipping:sustained:${ip}`, limit: 200, windowSec: 3600 },
    ]);
    if (limited) return limited;

    const body: ShippingRequestBody = await req.json();
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
