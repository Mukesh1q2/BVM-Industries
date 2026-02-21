import type { Metadata, Viewport } from "next";
import { Inter, Sora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/sections/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: '--font-sora', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: '--font-ibm', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://bvmindustries.com'),
  title: {
    default: "BVM Industries | Precision Aseptic Packaging Machinery",
    template: "%s | BVM Industries",
  },
  description: "Global Leader in Blow Moulding, Blow-Fill-Seal (BFS), and Precision Pharmaceutical Equipment.",
  keywords: ["Blow Moulding", "BFS", "Blow-Fill-Seal", "Aseptic Packaging", "Pharmaceutical Machinery", "Extrusion Blow Moulding", "Ampoule Filling", "Cleanroom Machinery"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bvmindustries.com",
    title: "BVM Industries | Precision Aseptic Packaging Machinery",
    description: "Global Leader in Blow Moulding, Blow-Fill-Seal (BFS), and Precision Pharmaceutical Equipment.",
    siteName: "BVM Industries",
    images: [{
      url: "/new_assets/optimized/bfs-machine.webp", // Will act as the default fallback OG image
      width: 1200,
      height: 630,
      alt: "BVM Industries BFS Machine"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BVM Industries | Precision Aseptic Machinery",
    description: "Global Leader in Blow Moulding and Blow-Fill-Seal (BFS) Equipment.",
    images: ["/new_assets/optimized/bfs-machine.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0F17',
  colorScheme: 'dark', // Explicitly locks the site into Dark Theme mode for browser UI
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${ibmPlexMono.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="antialiased bg-bvm-navy text-bvm-heading selection:bg-bvm-blue/30 overflow-x-hidden min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
