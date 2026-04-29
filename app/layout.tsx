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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600&family=Noto+Sans+JP:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-cream-50 text-charcoal-900 min-h-screen antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
