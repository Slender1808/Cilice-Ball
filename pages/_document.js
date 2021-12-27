import Document, { Html, Head, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
  componentDidMount() {}
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="MyDeathApp" />
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content="Find out how your death can be" />
          <meta property="og:url" content="https://mydeathapp.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="MyDeathApp" />
          <meta
            property="og:description"
            content="Find out how your death can be"
          />
          <meta
            property="og:image"
            content="https://mydeathapp.vercel.app/favicon.png"
          />
          <meta
            name="google-site-verification"
            content="K6n_i0D944OJIJwD-M5iQ-jy3oAKFS5aTTL3uJOpy9I"
          />
          <link rel="icon" href="/favicon.png" />
          <script async src="https://polyfill.io/v3/polyfill.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
