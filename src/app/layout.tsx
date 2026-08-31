import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';

import { NavProvider } from '@/src/providers/NavContext';
import { UserProvider } from '@/src/providers/UserContext';

import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400'],
});

export const metadata: Metadata = {
  title: 'CodeWax',
  description: 'An AI-powered RAG assistant for codebase exploration and analysis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <UserProvider>
          <NavProvider>{children}</NavProvider>
        </UserProvider>
      </body>
    </html>
  );
}
