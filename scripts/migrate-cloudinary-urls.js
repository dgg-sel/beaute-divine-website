/**
 * Script de migración: Cloudinary URL → public_id
 *
 * Este script convierte las URLs completas de Cloudinary almacenadas en la base de datos
 * (ej: https://res.cloudinary.com/dcwkpo1j1/image/upload/v123/archivo.png)
 * al formato nuevo de public_id
 * (ej: beaute-divine-espace/catalogo/archivo)
 *
 * ANTES DE EJECUTAR:
 *  1. Mové las imágenes en Cloudinary a la carpeta correcta (ej: beaute-divine-espace/catalogo/).
 *  2. Asegurate de que las variables CLOUDINARY_ROOT_FOLDER y CLOUDINARY_CATALOG_FOLDER
 *     estén configuradas en tu .env.
 *  3. Ejecutá con: node scripts/migrate-cloudinary-urls.js
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  const rootFolder = process.env.CLOUDINARY_ROOT_FOLDER;
  const catalogFolder = process.env.CLOUDINARY_CATALOG_FOLDER;

  if (!rootFolder || !catalogFolder) {
    console.error('❌ Error: Faltan variables de entorno CLOUDINARY_ROOT_FOLDER o CLOUDINARY_CATALOG_FOLDER en el .env');
    process.exit(1);
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error('❌ Error: Falta la variable NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en el .env');
    process.exit(1);
  }

  console.log(`\n🔍 Buscando productos con URLs completas de Cloudinary...`);
  console.log(`   Cloud: ${cloudName}`);
  console.log(`   Carpeta destino: ${rootFolder}/${catalogFolder}\n`);

  const products = await prisma.product.findMany();
  const toMigrate = products.filter(p => p.image.startsWith('http'));

  if (toMigrate.length === 0) {
    console.log('✅ No hay productos para migrar. Todos ya tienen el formato de public_id.');
    return;
  }

  console.log(`📦 Se encontraron ${toMigrate.length} producto(s) para migrar:\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of toMigrate) {
    try {
      // Extraer el public_id de la URL completa de Cloudinary.
      // URL ejemplo: https://res.cloudinary.com/dcwkpo1j1/image/upload/v1781357407/archivo.png
      // Queremos extraer solo: archivo (sin extensión), que va a vivir en rootFolder/catalogFolder/
      const url = new URL(product.image);
      // El path es algo como: /dcwkpo1j1/image/upload/v1234567/carpeta/archivo.png
      // Quitamos el prefijo hasta después de "upload/"
      const pathParts = url.pathname.split('/upload/');
      if (pathParts.length < 2) {
        console.warn(`  ⚠️  [${product.title}] No se pudo parsear la URL: ${product.image}`);
        errorCount++;
        continue;
      }

      let filePathWithVersion = pathParts[1]; // ej: "v1781357407/archivo.png" o "carpeta/archivo.png"

      // Quitar la versión si existe (ej: v1781357407/)
      filePathWithVersion = filePathWithVersion.replace(/^v\d+\//, '');

      // Quitar la extensión del archivo (ej: .png, .jpg, .webp)
      const publicIdWithoutExtension = filePathWithVersion.replace(/\.[^/.]+$/, '');

      // Extraer solo el nombre del archivo (última parte del path)
      // para cuando la URL ya incluía una carpeta vieja
      const filename = publicIdWithoutExtension.split('/').pop();

      // Construir el nuevo public_id con la carpeta correcta
      const newPublicId = `${rootFolder}/${catalogFolder}/${filename}`;

      await prisma.product.update({
        where: { id: product.id },
        data: { image: newPublicId }
      });

      console.log(`  ✅ [${product.title}]`);
      console.log(`     Antes: ${product.image}`);
      console.log(`     Ahora: ${newPublicId}\n`);
      successCount++;

    } catch (err) {
      console.error(`  ❌ [${product.title}] Error: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Migración completada:`);
  console.log(`   ✅ Exitosos: ${successCount}`);
  console.log(`   ❌ Con error: ${errorCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
