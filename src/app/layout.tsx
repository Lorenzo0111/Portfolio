import "@/styles/globals.css";

import Footer from "@/components/footer";
import GradientBackground from "@/components/gradient-background";
import { LanguageProvider } from "@/components/i18n-provider";
import Navbar from "@/components/navbar";
import { getLocaleServer } from "@/lib/i18n-server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: {
    template: "%s - Lorenzo0111",
    default: "Lorenzo0111",
  },
  description:
    "Software developer from Italy specializing in Typescript and Java.",
  metadataBase: new URL("https://lorenzo0111.me"),
  openGraph: {
    type: "website",
    url: "https://lorenzo0111.me",
    images: ["/icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fcba03",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocaleServer();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={"flex flex-col min-h-screen w-full " + inter.className}>
        <SpeedInsights />
        <LanguageProvider initialLocale={locale}>
          <Navbar />
          <GradientBackground />
          <NuqsAdapter>
            <main className="grow w-full">{children}</main>
          </NuqsAdapter>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
