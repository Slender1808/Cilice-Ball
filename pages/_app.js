import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { appWithTranslation } from 'next-i18next'

import Analytics from "../components/Analytics";
import GADS from "../components/GADS";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <GADS />
    </>
  );
}

export default appWithTranslation(MyApp)
