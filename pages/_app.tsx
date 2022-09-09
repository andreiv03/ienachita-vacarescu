import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

import { ContextProvider } from "../context";

import "../styles/globals.scss";
import styles from "../styles/layout.module.scss";
const Header = dynamic(() => import("../components/header"));
const Footer = dynamic(() => import("../components/footer"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>National College &quot;Ienăchiță Văcărescu&quot; Târgoviște</title>
      </Head>
      
      <ContextProvider>
        <div className={styles.app}>
          <Header />
          <div className={styles.wrapper}>
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;