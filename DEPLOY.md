# DEPLOY — Integración envíos + hardening (dgg-master → Beauté Divine)

Flujo para probar y desplegar los cambios de la rama `feat/integracion-dgg`
sin tocar producción hasta que todo esté verde. Mismo esquema que sel-web-v2:
**Neon branch + Vercel preview**.

## 1. Entorno aislado (branch)

1. **Git:** trabajar en `feat/integracion-dgg`.
2. **Neon branch:** en el dashboard de Neon, crear un branch de la base de
   producción (copia aislada con los datos reales). Copiar su connection string.
3. **Vercel preview:** el push de la rama genera un Preview Deployment. En
   *Project → Settings → Environment Variables → Preview*, setear:
   - `DATABASE_URL` = connection string del **branch de Neon** (NO el de prod).
   - El resto de las variables (ver §3), con credenciales de **test** de MP.

   > ⚠️ **El preview necesita el set COMPLETO de env existentes, no solo las
   > nuevas.** `lib/env.ts` valida todo el env de forma eager al cargarse, y
   > varias rutas lo importan (webhook directo; envíos/checkout vía
   > `lib/email.ts`). Si al build del preview le falta cualquiera de las
   > existentes (ej. `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, SMTP_*, etc.), falla en
   > "Collecting page data". Esto es comportamiento preexistente del proyecto, no
   > de esta integración — pero conviene tenerlo presente al armar el preview.

## 2. Cambio de schema (aditivo)

El único cambio de base de datos es la tabla nueva `RateLimit`. Aplicarla
**al branch de Neon** (nunca directo a prod al principio):

```bash
# con DATABASE_URL apuntando al branch de Neon
npx prisma db push
npx prisma generate
```

`RateLimit` es una tabla nueva, no altera datos existentes. Beauté usa
`db push` (no hay carpeta `prisma/migrations/`); se mantiene ese flujo.

> ⚠️ **Orden crítico:** la tabla `RateLimit` debe existir ANTES de que corra
> cualquier endpoint con `guard()`. El rate-limiter **falla cerrado**: si la
> tabla no existe, todos los endpoints protegidos (envíos, checkout, login,
> registro, reset) empiezan a devolver 429. Por eso: `db push` primero,
> deploy del código después.

## 3. Variables de entorno

### Ya existentes (no cambian)
`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `MP_ACCESS_TOKEN`,
`MP_WEBHOOK_SECRET`, `SALES_EMAILS`, SMTP_*, CLOUDINARY_*, y las de envíos ya
usadas: `SHIPPING_MODE`, `SHIPPING_ORIGIN_ZIP`, `SHIPPING_LOCAL_ZIPS`,
`SHIPPING_REGIONAL_ZIPS`, `SHIPPING_CORREO_LOCAL/REGIONAL/NACIONAL`,
`SHIPPING_COST` (kill switch).

### Nuevas — Rate limiting
- `RATE_LIMIT_DRIVER` — opcional. Default `postgres` (usa la DB actual). Poner
  `upstash` solo si se quiere sacar la carga a Upstash (requiere las dos de abajo).
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` — solo si driver=upstash.

### Nuevas — Andreani / OCA "en potencia" (off por defecto)
Los proveedores solo se ofrecen si se los prende explícitamente:
- `SHIPPING_ANDREANI_ENABLED` = `true` para activar Andreani.
- `SHIPPING_OCA_ENABLED` = `true` para activar OCA.

Al activarlos en **modo tabla fija** (`SHIPPING_MODE=FIXED` o fallback de
`HYBRID`), configurar sus precios por zona (o editarlos desde el panel admin,
que los pisa vía `AppSetting`):
- `SHIPPING_ANDREANI_LOCAL/REGIONAL/NACIONAL`
- `SHIPPING_OCA_LOCAL/REGIONAL/NACIONAL`

Para **cotización API en vivo** (`API_ONLY`/`HYBRID`), además:
- `SHIPPING_ANDREANI_API_URL`, `SHIPPING_ANDREANI_API_KEY`, `SHIPPING_ANDREANI_CONTRATO`
- `SHIPPING_OCA_API_URL`, `SHIPPING_OCA_API_KEY`

> ⚠️ **Limitación conocida del modo API en vivo:** la cotización real usa peso y
> volumen del producto (`weight/height/width/depth`), campos que hoy el modelo
> `Product` **no tiene** (se asumen 0 → cotización incorrecta). Para usar API en
> vivo hay que agregar esos campos al schema primero. En modo tabla fija no hace
> falta. Por eso "en potencia" = listo para prender en tabla fija, no API en vivo.

## 4. Verificación en el preview (antes de mergear)

- [ ] `npm run build` limpio.
- [ ] **Rate-limit:** martillar `/api/shipping` sobre el límite → 429 con
  header `Retry-After`. Uso normal (con la tabla creada) pasa sin bloquear.
- [ ] **Envíos:** sin `*_ENABLED`, `/api/shipping` devuelve solo Correo (igual
  que hoy). Con `SHIPPING_ANDREANI_ENABLED=true`, aparece Andreani.
- [ ] **Checkout:** flujo completo hasta la preferencia de MP. Body inválido
  (ej. sin `shippingZipCode`) → 400 de zod.
- [ ] **Webhook (pago de test):**
  - Aprobado → orden `PAID`, mails enviados, **carrito vaciado**, stock -1.
  - Reenviar la MISMA notificación → NO duplica mails (idempotencia).
  - Firma inválida → 403.
  - `rejected`/`refunded` → stock restaurado, orden `CANCELLED`.
- [ ] **Auth:** login/registro/forgot bajo el límite OK; sobre el límite → 429.
  Flujo de reset con token hasheado end-to-end (pedir link → resetear).

## 5. Rollout a producción

1. Merge `feat/integracion-dgg` → `main` (o el flujo de PR habitual) solo con
   todo lo anterior en verde.
2. **Antes** de que el deploy de prod sirva tráfico, aplicar el schema a la DB
   de producción: `prisma db push` con `DATABASE_URL` de prod (tabla `RateLimit`,
   aditiva).
3. Cargar en Vercel (Production) las env nuevas. Como mínimo confirmar que
   `MP_WEBHOOK_SECRET` real está bien seteada — si falla, el webhook fail-closed
   rechaza pagos reales **en silencio**.
4. Andreani/OCA quedan apagados hasta que se carguen sus `*_ENABLED` + precios.
5. Post-deploy: repetir el pago de test del webhook contra producción.
