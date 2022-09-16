import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/pages/home.module.scss";

interface Props {
};

const title = `National College "Ienăchiță Văcărescu" Târgoviște`;

const Home: NextPage<Props> = ({ }) => {
  return (
    <div className={styles.page}>
      <Head>
        <meta itemProp="name" content={title} />
        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
      </Head>
    </div>
  );
}

export default Home;