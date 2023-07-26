import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head"; // Import the Head component from Next.js
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "polygon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Add your meta tags, title, etc. within the Head component */}
        <title>Heroes Battle Arena Raffle | Buy and win</title>
        <meta name="description" content="Your meta description here" />
        <meta name="facebook-domain-verification" content="7qvotamngngrhn1rkyicuwcbn8r3y6" />
        {/* Add any other meta tags, CSS, or scripts you need in the <head></head> section */}
      </Head>
      <ThirdwebProvider activeChain={activeChain}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </>
  );
}

export default MyApp;
