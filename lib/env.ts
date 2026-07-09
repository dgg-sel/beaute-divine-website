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
  cloudinaryCloudName: requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: requireEnv("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: requireEnv("CLOUDINARY_API_SECRET"),
  cloudinaryRootFolder: requireEnv("CLOUDINARY_ROOT_FOLDER"),
  // Opcional: si tu cuenta usa Dynamic Folders, el public_id no incluye la subcarpeta.
  cloudinaryCatalogFolder: optionalEnv("CLOUDINARY_CATALOG_FOLDER"),

  // Auth
  nextAuthSecret: requireEnv("NEXTAUTH_SECRET"),

  // Database
  databaseUrl: requireEnv("DATABASE_URL"),

  // Mercado Pago
  mpAccessToken: requireEnv("MP_ACCESS_TOKEN"),
  mpWebhookSecret: requireEnv("MP_WEBHOOK_SECRET"),

  // Emails
  smtpHost: requireEnv("SMTP_HOST"),
  smtpPort: requireEnv("SMTP_PORT"),
  smtpUser: requireEnv("SMTP_USER"),
  smtpPass: requireEnv("SMTP_PASS"),
  smtpFrom: optionalEnv("SMTP_FROM") || requireEnv("SMTP_USER"),
  salesEmails: requireEnv("SALES_EMAILS"),
};
