import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { FilterProvider } from '@/context/FilterContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Storify - Your Online Shop',
  description: 'A simple e-commerce application built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <FilterProvider>
            <Header />
            <main className="container mx-auto px-2">
              {children}
            </main>
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}