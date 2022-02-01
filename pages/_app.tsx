import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import "../styles/globals.scss";
const Header = dynamic(() => import("../components/header"));
const Footer = dynamic(() => import("../components/footer"));

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default App;