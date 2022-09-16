import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Context, ContextProvider } from "../context";

import "../styles/globals.scss";
import styles from "../styles/layout.module.scss";
const Label = dynamic(() => import("../components/label"));
const Header = dynamic(() => import("../components/header"));
const Menu = dynamic(() => import("../components/menu"));
const Footer = dynamic(() => import("../components/footer"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <Context.Consumer>
        {({ isMenuOpen: [isMenuOpen] }) => (
          <HelmetProvider>
            <Head>
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <title>{`National College "Ienăchiță Văcărescu" Târgoviște`}</title>
            </Head>

            <Helmet>
              <body className={isMenuOpen ? styles.overflow_hidden : ""} />
            </Helmet>

            <div className={styles.app}>
              <Label />
              <Header />
              <Menu />

              <div className={styles.wrapper}>
                <Component {...pageProps} />
                <Footer />
              </div>
            </div>
          </HelmetProvider>
        )}
      </Context.Consumer>
    </ContextProvider>
  );
}

export default App;