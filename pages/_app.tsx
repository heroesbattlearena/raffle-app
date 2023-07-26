// pages/_app.js
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import NextScript from "next/script"; // Import NextScript
import Navbar from "../components/Navbar";

const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Add your meta tags, title, etc. within the Head component */}
        <title>Buy & Win with Heroes Battle Arena</title>
        <meta name="description" content="Heroes Battle Arena Game and Raffle" />
        <meta name="facebook-domain-verification" content="7qvotamngngrhn1rkyicuwcbn8r3y6" />
        {/* Add any other meta tags, CSS, or scripts you need in the <head></head> section */}
      </Head>
      <ThirdwebProvider activeChain={activeChain}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
      {/* Include the facebook-pixel.html */}
      <NextScript strategy="lazyOnload" src="/facebook-pixel.html" />
    </>
  );
}

export default MyApp;
