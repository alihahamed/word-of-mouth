import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { SmoothScroll } from '@/components/SmoothScroll';

const outfit = Outfit({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Keiko',
  description: 'Keiko Landing Page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "dark", "font-sans", outfit.variable)}>
      <body className="font-sans min-h-full flex flex-col bg-black text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
