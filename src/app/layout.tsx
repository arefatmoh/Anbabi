import "@fontsource-variable/caveat/wght.css";
import "@fontsource-variable/fraunces/wght.css";
import "@fontsource-variable/manrope/wght.css";
import "@fontsource/noto-sans-ethiopic/400.css";
import "@fontsource/noto-sans-ethiopic/600.css";
import "./globals.css";

import type { Metadata, Viewport } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  icons: {
    icon: [
      { url: "/assets/brand/anbabi-icon-32.png", sizes: "32x32" },
      { url: "/assets/brand/anbabi-icon-192.png", sizes: "192x192" },
    ],
    apple: "/assets/brand/anbabi-icon-180.png",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_ET",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFDF9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <a
          href="#main-content"
          className="bg-ink text-cream focus:outline-brand-orange fixed top-3 left-3 z-[100] -translate-y-20 rounded-xl px-4 py-3 font-bold transition focus:translate-y-0 focus:outline-3 focus:outline-offset-2 motion-reduce:transition-none"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
