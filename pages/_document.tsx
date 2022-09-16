import { Head, Html, Main, NextScript } from "next/document";

const data = {
  description: `National College "Ienăchiță Văcărescu" represents the place where students will gain what was called at the beginning of the century "high education".`,
  image: "https://ienachita-vacarescu.vercel.app/assets/thumbnail-v0.jpg/",
  title: `National College "Ienăchiță Văcărescu" Târgoviște`,
  url: "https://ienachita-vacarescu.vercel.app/"
};

const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />

        <meta name="description" content={data.description} />
        <meta itemProp="description" content={data.description} />
        <meta itemProp="image" content={data.image} />
        <meta itemProp="name" content={data.title} />

        <meta property="og:description" content={data.description} />
        <meta property="og:image" content={data.image} />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:site_name" content={data.title} />
        <meta property="og:title" content={data.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={data.url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={data.description} />
        <meta name="twitter:image" content={data.image} />
        <meta name="twitter:image:alt" content={data.title} />
        <meta name="twitter:title" content={data.title} />

        <link rel="canonical" href={data.url} />
        <link rel="icon" href="/favicon.ico/" />
        <link rel="manifest" href="/site.webmanifest/" />

        <link as="font" crossOrigin="" href="/fonts/Gilmer-Regular.woff2" rel="preload" />
        <link as="font" crossOrigin="" href="/fonts/Gilmer-Bold.woff2" rel="preload" />

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