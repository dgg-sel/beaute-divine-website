/**
 * Validación de variables de entorno requeridas.
 *
 * Este módulo valida que todas las variables críticas estén configuradas
 * antes de que la aplicación procese cualquier request.
 *
 * Si falta alguna variable, lanza un error con un mensaje claro que
 * indica exactamente qué hay que configurar en el .env
 *
 * NOTA sobre Cloudinary Dynamic Folders:
 * En cuentas con "Dynamic Folders" activado, mover imágenes en el panel
 * de Cloudinary NO cambia el public_id. El public_id siempre será
 * ROOT_FOLDER/filename, independientemente de la carpeta visual en el panel.
 * CLOUDINARY_CATALOG_FOLDER es opcional: si está vacía, las imágenes se
 * suben directamente a ROOT_FOLDER/.
 */

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `\n\n❌ Variable de entorno faltante: "${name}"\n` +
      `   Agregá esta variable a tu archivo .env y reiniciá el servidor.\n` +
      `   Ejemplo: ${name}="tu-valor-aqui"\n`
    );
  }
  return value;
}

function optionalEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export const env = {
  // Cloudinary
  get cloudinaryCloudName() { return requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"); },
  get cloudinaryApiKey() { return requireEnv("CLOUDINARY_API_KEY"); },
  get cloudinaryApiSecret() { return requireEnv("CLOUDINARY_API_SECRET"); },
  get cloudinaryRootFolder() { return requireEnv("CLOUDINARY_ROOT_FOLDER"); },
  get cloudinaryCatalogFolder() { return optionalEnv("CLOUDINARY_CATALOG_FOLDER"); },

  // Auth
  get nextAuthSecret() { return requireEnv("NEXTAUTH_SECRET"); },

  // Database
  get databaseUrl() { return requireEnv("DATABASE_URL"); },

  // Mercado Pago
  get mpAccessToken() { return requireEnv("MP_ACCESS_TOKEN"); },
  get mpWebhookSecret() { return requireEnv("MP_WEBHOOK_SECRET"); },

  // Emails
  get smtpHost() { return requireEnv("SMTP_HOST"); },
  get smtpPort() { return requireEnv("SMTP_PORT"); },
  get smtpUser() { return requireEnv("SMTP_USER"); },
  get smtpPass() { return requireEnv("SMTP_PASS"); },
  get smtpFrom() { return optionalEnv("SMTP_FROM") || requireEnv("SMTP_USER"); },
  get salesEmails() { return requireEnv("SALES_EMAILS"); },
};
