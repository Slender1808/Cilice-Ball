import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { appWithTranslation } from 'next-i18next'

import Analytics from "../components/Analytics";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default appWithTranslation(MyApp)
