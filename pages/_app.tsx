import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "aos/dist/aos.css";

import AOS from "aos";
import { config } from "@fortawesome/fontawesome-svg-core";
import Head from "next/head";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main className={inter.className}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>Lorenzo0111</title>
          <meta name="title" content="Lorenzo0111" />
          <meta
            name="description"
            content="Java and Web developer from Italy"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://lorenzo0111.me" />
          <meta property="og:title" content="Lorenzo0111" />
          <meta
            property="og:description"
            content="Java and Web developer from Italy"
          />
          <meta name="theme-color" content="#fcba03" />
          <meta
            property="og:image"
            content="https://lorenzo0111.me/assets/images/Lorenzo0111.png"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col min-h-screen w-full">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
          <Analytics />
        </div>
      </SessionProvider>
    </main>
  );
}
