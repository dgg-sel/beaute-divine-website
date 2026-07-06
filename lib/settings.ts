import { prisma } from "./prisma";

/**
 * Obtiene el costo de envío dinámico desde la base de datos.
 * Si no existe en la BD, lee la variable de entorno SHIPPING_COST como fallback.
 * Si la variable de entorno tampoco existe, devuelve 0.
 */
export async function getShippingCost(): Promise<number> {
  try {
    const setting = await prisma.appSetting.findUnique({
      where: { key: "SHIPPING_COST" }
    });
    
    if (setting) {
      return parseFloat(setting.value);
    }
  } catch (error) {
    console.error("Error leyendo SHIPPING_COST de la base de datos:", error);
  }
  
  // Fallback a la variable de entorno
  return parseFloat(process.env.SHIPPING_COST || "0");
}
