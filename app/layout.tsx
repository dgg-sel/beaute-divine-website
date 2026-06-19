import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import RevealAnimator from '@/components/RevealAnimator';
import Providers from '@/components/Providers';

export const metadata = {
  title: 'BEAUTÉ DIVINE ESPACE | Belleza Consciente',
  description: 'Una mirada consciente de la belleza.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen pb-20 lg:pb-0 bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <Providers>
          <Header />
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <Footer />
          <MobileNav />
          <RevealAnimator />
        </Providers>
      </body>
    </html>
  );
}
