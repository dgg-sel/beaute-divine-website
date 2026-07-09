import { NextResponse } from "next/server";
import { calculateShippingOptions, ShippingRequestBody } from "@/lib/shipping";

export async function POST(req: Request) {
  try {
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
