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
          <meta
            name="description"
            content="Java and Web developer from Italy"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </SessionProvider>
    </main>
  );
}
