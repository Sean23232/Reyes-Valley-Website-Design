import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileActionBar from "@/components/MobileActionBar";
import { siteConfig } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://reyesvalleypm.com"),
  title: {
    default:
      "Reyes Valley Property Management & Maintenance | Stockton & San Joaquin Valley",
    template: "%s | Reyes Valley Property Management & Maintenance",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "property management Stockton",
    "property maintenance San Joaquin Valley",
    "interior upkeep",
    "perimeter maintenance",
    "property modifications",
    "Stockton California property care",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title:
      "Reyes Valley Property Management & Maintenance | Stockton & San Joaquin Valley",
    description: siteConfig.description,
    images: [
      {
        url: "/images/hero-neighborhood.jpg",
        width: 1200,
        height: 630,
        alt: "Well-maintained residential neighborhood served by Reyes Valley Property Management & Maintenance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyes Valley Property Management & Maintenance",
    description: siteConfig.description,
    images: ["/images/hero-neighborhood.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1b2a",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  url: "https://reyesvalleypm.com",
  image: "https://reyesvalleypm.com/images/hero-neighborhood.jpg",
  areaServed: [
    { "@type": "City", name: "Stockton", addressRegion: "CA" },
    { "@type": "AdministrativeArea", name: "San Joaquin Valley, California" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Stockton",
    addressRegion: "CA",
    addressCountry: "US",
  },
  knowsAbout: [
    "Property Management",
    "Property Maintenance",
    "Perimeter Maintenance",
    "Interior Upkeep",
    "Property Modifications",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="bg-sand-50 text-navy-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <script
          type="application/ld+json"
          // Structured data only contains verified, non-invented information.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
