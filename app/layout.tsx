import * as React from 'react';
import type { Viewport } from 'next';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MainLayout } from 'src/layouts/MainLayout';

const inter = Inter({ subsets: ['latin'] });
export const viewport = {
  width: 'device-width',
  initialScale: 1,
} satisfies Viewport;

export const metadata: Metadata = {
  title: 'Face Recognition',
  description: 'Developed by Productzilla',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
