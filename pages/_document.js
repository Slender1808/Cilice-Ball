import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  componentDidMount() {}
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="CiliceBall" />
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content="Discover your future" />
          <meta property="og:url" content="https://ciliceball.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="CiliceBall" />
          <meta
            property="og:description"
            content="Discover your future"
          />
          <meta
            property="og:image"
            content="https://ciliceball.vercel.app/favicon.png"
          />
          <meta
            name="google-site-verification"
            content="K6n_i0D944OJIJwD-M5iQ-jy3oAKFS5aTTL3uJOpy9I"
          />
          <link rel="icon" href="/favicon.png" />
          <script async src="https://polyfill.io/v3/polyfill.min.js" />
          <meta name="coinzilla" content="747f08268ee7d5343d04469d08064708" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7540935582112706"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
