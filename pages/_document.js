import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en" className="bg-white">
      <Head>
        <meta name="description" content="Buy anything u want on E-Store" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
