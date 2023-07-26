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
        <script>
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
        </script>
        <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=835022581502548&ev=PageView&noscript=1"
        /></noscript>
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
