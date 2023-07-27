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
        <meta name="description" content="Your meta description here" />
        <meta name="facebook-domain-verification" content="7qvotamngngrhn1rkyicuwcbn8r3y6" />
        {/* Add any other meta tags, CSS, or scripts you need in the <head></head> section */}
        {/* Include the Facebook Pixel code directly in the head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '835022581502548');
              fbq('track', 'PageView');
            `,
          }}
        />
      </Head>
      <ThirdwebProvider activeChain={activeChain}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
      <NextScript strategy="lazyOnload" />
    </>
  );
}

export default MyApp;

