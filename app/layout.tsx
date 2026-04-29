'use client';
import './globals.css';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
