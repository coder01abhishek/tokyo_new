import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoaderWrapper from "./components/ui/LoaderWrapper";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from 'react';

// Initialize Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Project Tokyo - AI Companion Launchpad",
  description: "Create and interact with AI companions. Bring your character to life & go live on streaming platforms like Pump Fun, Twitch, Youtube etc.",
  keywords: "AI companion, AI character, streaming, virtual assistant, chatbot, AI friend",
  authors: [{ name: "Project Tokyo" }],
  creator: "Project Tokyo",
  publisher: "Project Tokyo",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: {
    icon: [
      // { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      // { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "Project Tokyo - AI Companion Launchpad",
    description: "Create and interact with AI companions. Bring your character to life & go live on streaming platforms.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Tokyo - AI Companion Launchpad",
    description: "Create and interact with AI companions. Bring your character to life & go live on streaming platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//4b7mwyeirrypbewg.public.blob.vercel-storage.com" />
        <link rel="preconnect" href="https://4b7mwyeirrypbewg.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/videos/doll.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/assets/gifs/consciousness.svg" as="image" />
        
        {/* Resource hints */}
        <meta name="theme-color" content="#111111" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<div className="min-h-screen bg-[#111111]" />}>
          <LoaderWrapper/>
        </Suspense>
        
        <Suspense fallback={<div className="h-16 bg-[#111111]" />}>
          <Header />
        </Suspense>
        
        <main className="min-h-screen">
          <Suspense fallback={<div className="min-h-screen bg-[#111111] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
            {children}
          </Suspense>
        </main>
        
        <Suspense fallback={<div className="bg-black h-32" />}>
          <Footer />
        </Suspense>
        
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}