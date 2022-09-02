import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { InteractionContextProvider } from "../context/interaction.context";

import "../styles/globals.scss";
const Header = dynamic(() => import("../components/header"));
const Footer = dynamic(() => import("../components/footer"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>National College &quot;Ienăchiță Văcărescu&quot; Târgoviște</title>
      </Head>
      
      <InteractionContextProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </InteractionContextProvider>
    </>
  );
}

export default App;