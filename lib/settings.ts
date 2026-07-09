import { prisma } from "./prisma";

export async function getShippingSettings(): Promise<{ local: number; regional: number; nacional: number }> {
  let local = parseFloat(process.env.SHIPPING_CORREO_LOCAL || "0");
  let regional = parseFloat(process.env.SHIPPING_CORREO_REGIONAL || "0");
  let nacional = parseFloat(process.env.SHIPPING_CORREO_NACIONAL || "0");

  try {
    const settings = await prisma.appSetting.findMany({
      where: {
        key: { in: ["SHIPPING_FIXED_LOCAL", "SHIPPING_FIXED_REGIONAL", "SHIPPING_FIXED_NACIONAL"] }
      }
    });

    for (const setting of settings) {
      if (setting.key === "SHIPPING_FIXED_LOCAL") local = parseFloat(setting.value);
      if (setting.key === "SHIPPING_FIXED_REGIONAL") regional = parseFloat(setting.value);
      if (setting.key === "SHIPPING_FIXED_NACIONAL") nacional = parseFloat(setting.value);
    }
  } catch (error) {
    console.error("Error leyendo configuración de envíos de la base de datos:", error);
  }

  return { local, regional, nacional };
}
