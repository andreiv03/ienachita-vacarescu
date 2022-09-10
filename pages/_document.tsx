import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link as="font" crossOrigin="" href="/fonts/Eina01-Regular.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Eina01-Bold.woff2" rel="preload" />

        <link as="font" crossOrigin="" href="/fonts/Gilmer-Normal.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Gilmer-Bold.woff2" rel="preload" />

        <link as="font" crossOrigin="" href="/fonts/MarkPro-Bold.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/MarkPro-Heavy.woff2" rel="preload" />

        <link as="font" crossOrigin="" href="/fonts/Metro-Regular.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Metro-SemiBold.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Metro-Bold.woff2" rel="preload" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;