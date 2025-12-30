import "@/styles/globals.css";

import Footer from "@/components/footer";
import GradientBackground from "@/components/gradient-background";
import Navbar from "@/components/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"flex flex-col min-h-screen w-full " + inter.className}>
        <SpeedInsights />
        <Navbar />
        <GradientBackground />
        <main className="grow w-full">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
