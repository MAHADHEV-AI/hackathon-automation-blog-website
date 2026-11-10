import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { StoreProvider } from '@/context/StoreContext';
import { CartProvider } from '@/context/CartContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating';

export const metadata: Metadata = {
  title: 'KOMBAN CUTS | Fresh Meat & Seafood Online Delivery in Coimbatore',
  description:
    'Order fresh antibiotic-free chicken, tender mutton, daily sea fish, and farm eggs online in Coimbatore. 45-60 mins express delivery across RS Puram, Gandhipuram, Saibaba Colony & Peelamedu.',
  keywords: [
    'Fresh chicken in Coimbatore',
    'Fresh mutton in Coimbatore',
    'Fresh fish in Coimbatore',
    'Meat delivery Coimbatore',
    'Online meat shop Coimbatore',
    'Chicken home delivery Coimbatore',
    'Vanjaram fish Coimbatore',
    'Country eggs Coimbatore',
    'Komban Cuts',
  ],
  authors: [{ name: 'KOMBAN CUTS' }],
  openGraph: {
    title: 'KOMBAN CUTS – Premium Online Meat & Seafood E-Commerce Coimbatore',
    description: 'Fresh Cuts. Pure Quality. Delivered Fresh. Experience quality meat delivery in Coimbatore.',
    url: 'https://kombancuts.com',
    siteName: 'KOMBAN CUTS',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased bg-white text-gray-900">
        <AuthProvider>
          <StoreProvider>
            <CartProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <WhatsAppFloating />
            </CartProvider>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

