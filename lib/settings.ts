import { prisma } from "./prisma";

export interface ZonePrices {
  local: number;
  regional: number;
  nacional: number;
}

export interface ShippingSettings {
  correo: ZonePrices;
  andreani: ZonePrices;
  oca: ZonePrices;
}

function envNum(name: string): number {
  const val = parseFloat(process.env[name] || "0");
  return isNaN(val) ? 0 : val;
}

/**
 * Precios fijos de envío por zona y proveedor.
 *
 * Modelo de config: la variable de entorno es el DEFAULT; la fila en AppSetting
 * (editable desde el panel admin) lo pisa si existe. Así el cliente arranca con
 * las tarifas del .env y puede ajustarlas en caliente sin redeploy.
 *
 * Las claves históricas de Correo (SHIPPING_FIXED_LOCAL/REGIONAL/NACIONAL) se
 * mantienen tal cual para no romper configuraciones ya guardadas.
 */
export async function getShippingSettings(): Promise<ShippingSettings> {
  const settings: ShippingSettings = {
    correo: {
      local: envNum("SHIPPING_CORREO_LOCAL"),
      regional: envNum("SHIPPING_CORREO_REGIONAL"),
      nacional: envNum("SHIPPING_CORREO_NACIONAL"),
    },
    andreani: {
      local: envNum("SHIPPING_ANDREANI_LOCAL"),
      regional: envNum("SHIPPING_ANDREANI_REGIONAL"),
      nacional: envNum("SHIPPING_ANDREANI_NACIONAL"),
    },
    oca: {
      local: envNum("SHIPPING_OCA_LOCAL"),
      regional: envNum("SHIPPING_OCA_REGIONAL"),
      nacional: envNum("SHIPPING_OCA_NACIONAL"),
    },
  };

  // Mapa clave-de-DB → destino en la estructura. Correo conserva sus claves
  // históricas; Andreani y OCA usan claves nuevas namespaced.
  const dbKeyMap: Record<string, [keyof ShippingSettings, keyof ZonePrices]> = {
    SHIPPING_FIXED_LOCAL: ["correo", "local"],
    SHIPPING_FIXED_REGIONAL: ["correo", "regional"],
    SHIPPING_FIXED_NACIONAL: ["correo", "nacional"],
    SHIPPING_FIXED_ANDREANI_LOCAL: ["andreani", "local"],
    SHIPPING_FIXED_ANDREANI_REGIONAL: ["andreani", "regional"],
    SHIPPING_FIXED_ANDREANI_NACIONAL: ["andreani", "nacional"],
    SHIPPING_FIXED_OCA_LOCAL: ["oca", "local"],
    SHIPPING_FIXED_OCA_REGIONAL: ["oca", "regional"],
    SHIPPING_FIXED_OCA_NACIONAL: ["oca", "nacional"],
  };

  try {
    const rows = await prisma.appSetting.findMany({
      where: { key: { in: Object.keys(dbKeyMap) } },
    });
    for (const row of rows) {
      const target = dbKeyMap[row.key];
      if (!target) continue;
      const val = parseFloat(row.value);
      if (!isNaN(val)) settings[target[0]][target[1]] = val;
    }
  } catch (error) {
    console.error("Error leyendo configuración de envíos de la base de datos:", error);
  }

  return settings;
}
