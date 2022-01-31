import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "../styles/globals.scss";
import styles from "../styles/components/layout.module.scss";
const Header = dynamic(() => import("../components/header"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={styles.layout}>
      <Header />
      <Component {...pageProps} />
    </main>
  );
}

export default App;