import "@/styles/globals.css";
import "aos/dist/aos.css";

import { Metadata, Viewport } from "next";

import AnimationLoader from "@/components/animation";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Lorenzo0111",
  description: "Java and Web developer from Italy",
  metadataBase: new URL("https://lorenzo0111.me"),
  openGraph: {
    type: "website",
    url: "https://lorenzo0111.me",
    title: "Lorenzo0111",
    description: "Java and Web developer from Italy",
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
      <html lang="en">
        <body
          className={"flex flex-col min-h-screen w-full " + inter.className}
        >
          <AnimationLoader />
          <SpeedInsights />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
