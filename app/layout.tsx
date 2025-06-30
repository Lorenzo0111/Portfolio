import "@/styles/globals.css";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: {
    template: "%s - Lorenzo0111",
    default: "Lorenzo0111",
  },
  description: "Java and Web developer from Italy",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#fcba03",
        },
      }}
    >
      <PlausibleProvider domain="lorenzo0111.me" selfHosted trackOutboundLinks>
        <html lang="en">
          <body
            className={"flex flex-col min-h-screen w-full " + inter.className}
          >
            <SpeedInsights />
            <Navbar />
            {children}
            <Footer />
            <Analytics />
          </body>
        </html>
      </PlausibleProvider>
    </ClerkProvider>
  );
}
