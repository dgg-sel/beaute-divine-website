# Contexto del Proyecto: Beauté Divine Espace

Este proyecto es una instancia del **DGG Master Template (Kitchen Sink)** adaptada para el cliente **Beauté Divine Espace** — una spa y estética de lujo con e-commerce de productos de belleza.

---

## 🔷 Datos del Proyecto

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Estilos:** Tailwind CSS v3 (NO actualizar a v4 — el diseño visual ya fue definido con v3)
- **Base de Datos:** SQLite local (`prisma/dev.db`) en desarrollo. Producción: Neon Postgres (Serverless)
- **ORM:** Prisma 5 (sin `@prisma/adapter-pg` aún — ver Pendiente #1)
- **Auth:** NextAuth v4 (JWT strategy)
- **Imágenes:** Cloudinary
- **Pagos:** Mercado Pago (SDK v3)
- **Estado del carrito:** Zustand con `persist` middleware
- **Email:** Nodemailer
- **Hosting:** Vercel (rama `main` → producción)
- **Git Flow:** `dev` para desarrollo diario → `main` para producción

---

## 🔷 Stack Tecnológico (Versiones Exactas)

- Next.js: `14.2.3`
- React: `^18`
- Tailwind CSS: `^3.4.3`
- Prisma Client: `^5.14.0`
- NextAuth: `^4.24.7`
- Mercado Pago SDK: `^3.1.0`
- Zustand: `^5.0.14`
- Cloudinary: `^2.10.0`
- Lucide React: `^0.378.0`
- Nodemailer: `^7.0.13`

---

## 🔷 Identidad Visual (NO MODIFICAR sin autorización)

- **Tono:** Elegante, holístico, cercano, centrado en el bienestar.
- **Paleta Principal:** `#4A4238` (dorado oscuro, texto primario), `#c49e62` (dorado acento), `#FDFBF7` (fondo cálido), `#EAE5DF` (bordes suaves).
- **Tipografías:** Cormorant Garamond (display/títulos) + Jost (body/sans).
- **Idioma:** Español rioplatense — siempre de **"vos"**. NUNCA "tú" ni "usted".

---

## 🔷 Reglas Arquitectónicas Críticas (Heredadas de DGG Master)

### 1. Framework y Rutas
- Next.js App Router. Las páginas viven directamente en `app/` — este proyecto es **mono-idioma español** (sin segmento `[lang]`).
- El `app/layout.tsx` raíz es el ÚNICO archivo con etiquetas `<html>` y `<body>`.

### 2. Tailwind v3 (CONGELADO)
- Este proyecto **usa Tailwind CSS v3**. NO migrar a v4.
- Las clases arbitrarias (`rounded-[24px]`, `shadow-[0_12px_40px_rgba(0,0,0,0.25)]`) no deben traducirse a utilidades nativas.
- Para colores con opacidad en Safari, usar `style={{ backgroundColor: 'rgba(...)' }}` en lugar de clases Tailwind.
- Backdrop-blur: siempre `style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}`.

### 3. Base de Datos (Prisma)
- En desarrollo: SQLite. En producción: Neon Postgres con `@prisma/adapter-pg` (ver Pendiente #1).
- **NUNCA** usar `--accept-data-loss` en scripts automáticos.
- `package.json` debe tener `"postinstall": "prisma generate"` solo (sin `db push`) para el deploy en Vercel.
- **CRÍTICO:** El `postinstall` actual tiene `prisma db push` — eliminar antes del primer deploy a Vercel.

### 4. Autenticación (NextAuth)
- JWT strategy. El callback de sesión re-consulta la DB en cada request.
- `<SessionProvider>` en el layout correcto para no romper la hidratación.
- Passkeys/WebAuthn: NO implementado. No agregar sin instrucción explícita.

### 5. Validación de Variables de Entorno
- `lib/env.ts` hace `requireEnv()` para las críticas. Si falta una variable, el servidor falla con mensaje claro.

### 6. UI/UX — Reglas Absolutas
- Todo diálogo, popup o modal **DEBE** cerrarse con la tecla `ESC`.
- Imágenes en grillas cuadradas (`aspect-square`): siempre `h-full w-full object-cover`.
- Páginas pantalla completa: usar `flex-1`, NUNCA `min-h-screen` dentro de `flex-1`.
- PROHIBIDO que la IA rediseñe, cambie tipografías, agregue estilos no solicitados o altere colores/márgenes sin instrucción explícita.
- Nuevos componentes DEBEN heredar la paleta e identidad visual del proyecto.

### 7. Prevención de Regresiones
- **NUNCA** usar scripts de Regex para modificar UI. Siempre usar `replace_file_content` o `multi_replace_file_content`.
- Preservar todos los paddings/márgenes existentes salvo instrucción explícita.
- Dark Mode: este proyecto es **100% Light Mode**. Purgar clases `dark:` si aparecen.

### 8. Deploy en Vercel
- Cargar todas las variables de entorno en el dashboard de Vercel antes del primer build.
- Ver Pendiente #2 sobre `postinstall`.

### 9. Nomenclatura de Middleware
- El middleware DEBE llamarse `middleware.ts` en la raíz correcta. Si se renombra, Next.js lo ignora causando errores 404/500.

---

## 🔷 Módulo E-Commerce — Reglas y Decisiones de Diseño

### Carrito (Zustand)
- Estado: Zustand con `persist` (localStorage, key: `cart-storage`).
- Persistente para usuarios guest.
- Al hacer login → `POST /api/cart` sincroniza con DB.
- Al cargar sesión → `fetchUserCart()` reemplaza el carrito local con el de la DB.

### Productos
- Si `price` es `null`, el producto muestra "Consultar" sin botón de carrito.
- Los precios se muestran **con IVA incluido**. Sin IVA: `price / 1.21`.

### Órdenes y Stock
- El stock se **reserva atómicamente** en transacción Prisma al iniciar el checkout.
- Órdenes PENDING expiradas (> `STOCK_RESERVATION_MINUTES` min, default 15) se cancelan y el stock se libera.
- Estados de orden: `PENDING` → `PAID` (webhook) o `CANCELLED` (expiración).

### 🚚 ENVÍOS — Costo Fijo (DECISIÓN DEFINITIVA)

Los envíos tienen un **costo fijo configurado por variable de entorno**.

- **Variable de entorno:** `SHIPPING_COST` (en ARS, entero). Ejemplo: `SHIPPING_COST=2500`.
- El costo se agrega como ítem adicional en la preferencia de Mercado Pago: `{ id: "ENVIO", title: "Envío", quantity: 1, unit_price: shippingCost }`.
- El `total` de la `Order` en DB **incluye** el costo de envío.
- En la UI (a través del Server Component `app/checkout/page.tsx` que lee la variable del backend y la pasa como prop), el envío se muestra como **línea separada** (nunca mezclado con productos).
- Si `SHIPPING_COST=0` o la variable no está definida → no se agrega ítem de envío (envío gratis).
- Si en el futuro se agregan zonas de envío, se implementará como tabla `ShippingZone` en DB. Por ahora, es costo fijo.

### 💳 PAGOS — Mercado Pago
- SDK: `mercadopago` v3.
- Flujo: Preferencia → Redirect a Checkout Pro → Webhook confirma pago.
- Variables: `MP_ACCESS_TOKEN` (obligatoria), `NEXT_PUBLIC_BASE_URL` (para back_urls y notification_url).
- Webhook: `POST /api/webhooks/mercadopago`.
- Al confirmar (`status === "approved"`): actualiza `Order` a `PAID` y envía emails al admin y al cliente.
- Email admin: definido en `SALES_EMAILS` (puede ser múltiples, separados por coma).
- `currency_id` siempre `"ARS"`.

### 📦 Cambios Pendientes al Schema de Prisma (E-Commerce)

1. **`shippingCost Float @default(0)`** en `Order` → registrar el costo de envío cobrado por orden.
2. **`shippingAddress String?`** en `Order` → guardar la dirección de envío del cliente.
3. **`customerName String?` y `customerEmail String?`** en `Order` → para órdenes de usuarios guest.

---

## 🔷 Pendientes Arquitectónicos Críticos

### ⚠️ Pendiente #1 — Prisma Adapter para Producción (CRÍTICO ANTES DE DEPLOY)
El `lib/prisma.ts` actual usa `PrismaClient` directo. En Vercel serverless esto agotará conexiones.

Acción: instalar `@prisma/adapter-pg` + `pg`, reemplazar `lib/prisma.ts` con versión que usa `pg.Pool`, agregar `previewFeatures = ["driverAdapters"]` en el generator del schema.

### ⚠️ Pendiente #2 — Corregir `postinstall` (CRÍTICO ANTES DE DEPLOY)
`package.json` actual: `"postinstall": "prisma generate && prisma db push"`.
Corrección: `"postinstall": "prisma generate"` (el `db push` rompe el deploy en Vercel).

### ⚠️ Pendiente #3 — Envío Fijo en API de Checkout
Implementar en `POST /api/checkout/route.ts`:
- Leer `parseFloat(process.env.SHIPPING_COST || "0")`.
- Si `shippingCost > 0`: agregar al array de ítems de MP y sumar al `total` de la `Order`.
- Guardar `shippingCost` y `shippingAddress` en la `Order`.

### ⚠️ Pendiente #4 — Página de Checkout UI con Resumen + Dirección
Crear `app/checkout/page.tsx`:
- Revisión de carrito + campo **dirección de envío**.
- Resumen de costos: subtotal + envío + total.
- Botón "Pagar con Mercado Pago" (llama a `POST /api/checkout`).

### ⚠️ Pendiente #5 — Emails con Desglose de Envío
Los emails de confirmación (en el webhook) deben incluir:
- Dirección de envío.
- Costo de envío desglosado del total.

---

## 🔷 Estructura de Archivos Clave

```
app/
  api/
    auth/[...nextauth]/route.ts    ← NextAuth handler
    auth/register/route.ts         ← Registro
    auth/forgot-password/route.ts  ← Reset password (solicitud)
    auth/reset-password/route.ts   ← Reset password (confirmación)
    cart/route.ts                  ← GET/POST carrito (sync DB)
    checkout/route.ts              ← POST → preferencia MP + reserva stock
    cloudinary/sign/route.ts       ← Firma de uploads a Cloudinary
    webhooks/mercadopago/route.ts  ← POST → confirma pago, actualiza orden
  checkout/
    success/page.tsx               ← Pago exitoso (vacía carrito)
    failure/page.tsx               ← Pago fallido
    pending/page.tsx               ← Pago pendiente
  catalogo/page.tsx                ← Catálogo con filtros
  admin/page.tsx                   ← Panel de administración
lib/
  auth.ts                          ← authOptions de NextAuth
  email.ts                         ← sendEmail (Nodemailer)
  env.ts                           ← Validación de variables de entorno
  prisma.ts                        ← PrismaClient singleton
  stock.ts                         ← releaseExpiredReservations()
  store/useCartStore.ts            ← Zustand store del carrito
prisma/
  schema.prisma                    ← Modelos: User, Product, Category, Order, Cart
```

---

## 🔷 Variables de Entorno

| Variable | Requerida | Descripción |
|---|---|---|
| `DATABASE_URL` | ✅ | Postgres URL (dev: SQLite, prod: Neon) |
| `NEXTAUTH_SECRET` | ✅ | Secret para JWT |
| `NEXTAUTH_URL` | ✅ | URL base del sitio |
| `NEXT_PUBLIC_BASE_URL` | ✅ | URL pública para back_urls de MP |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloud name de Cloudinary |
| `CLOUDINARY_API_KEY` | ✅ | API Key Cloudinary |
| `CLOUDINARY_API_SECRET` | ✅ | API Secret Cloudinary |
| `CLOUDINARY_ROOT_FOLDER` | ✅ | Carpeta raíz Cloudinary |
| `CLOUDINARY_CATALOG_FOLDER` | ❌ | Subcarpeta catálogo (opcional) |
| `MP_ACCESS_TOKEN` | ✅ | Access token de Mercado Pago |
| `SALES_EMAILS` | ❌ | Emails de notificación de ventas |
| `SMTP_HOST` | ✅ | Servidor SMTP |
| `SMTP_PORT` | ✅ | Puerto SMTP |
| `SMTP_USER` | ✅ | Usuario SMTP |
| `SMTP_PASS` | ✅ | Contraseña SMTP |
| `STOCK_RESERVATION_MINUTES` | ❌ | Minutos reserva de stock (default: 15) |
| `SHIPPING_COST` | ❌ | Costo fijo de envío en ARS (default: 0 = gratis) |

---

*Nota para la IA: Leer siempre este archivo antes de realizar cambios estructurales, proponer comandos de Git, o modificar el flujo de pagos/envíos.*
