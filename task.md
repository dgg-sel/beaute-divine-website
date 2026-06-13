# Next.js Migration Checklist

- [x] 1. Setup the Next.js `app` router
  - [x] Create `app/globals.css` containing Tailwind directives and copy contents of `css/custom.css`.
  - [x] Create `app/layout.tsx` with standard Next.js root layout.
- [x] 2. Convert the static HTML to React components
  - [x] Create `components/Header.tsx`, `components/Footer.tsx`, `components/MobileNav.tsx`.
  - [x] Create `app/page.tsx` by converting the main content of `index.html`.
- [x] 3. Build the Admin Interface & NextAuth
  - [x] Create `app/api/auth/[...nextauth]/route.ts` using NextAuth with GoogleProvider and PrismaAdapter.
  - [x] Create `app/admin/page.tsx` (protected dashboard, list products, basic form to add a new product).
- [x] 4. Connect Catalogo to DB
  - [x] Create `app/catalogo/page.tsx` converting `catalogo.html` to React, and fetch the products from the database (`await prisma.product.findMany()`).
