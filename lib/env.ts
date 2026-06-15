/**
 * Validación de variables de entorno requeridas.
 *
 * Este módulo valida que todas las variables críticas estén configuradas
 * antes de que la aplicación procese cualquier request.
 *
 * Si falta alguna variable, lanza un error con un mensaje claro que
 * indica exactamente qué hay que configurar en el .env
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

export const env = {
  // Cloudinary
  cloudinaryCloudName: requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: requireEnv("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: requireEnv("CLOUDINARY_API_SECRET"),
  cloudinaryRootFolder: requireEnv("CLOUDINARY_ROOT_FOLDER"),
  cloudinaryCatalogFolder: requireEnv("CLOUDINARY_CATALOG_FOLDER"),

  // Auth
  nextAuthSecret: requireEnv("NEXTAUTH_SECRET"),

  // Database
  databaseUrl: requireEnv("DATABASE_URL"),
};
