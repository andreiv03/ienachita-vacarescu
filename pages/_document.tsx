import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <link as="font" crossOrigin="" href="/fonts/Metro-Web-Regular.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Metro-Web-SemiBold.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Metro-Web-Bold.woff2" rel="preload" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;