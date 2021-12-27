import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import Screen from "../lib/Screen";
const Ads = dynamic(() => import("../components/adaround"), { ssr: false });
const ADSBlock = dynamic(() => import("../components/ADSBlock"), {
  ssr: false,
});

function Home() {
  const { t } = useTranslation("common");

  let [birthday, setBirthday] = useState(false);
  let [percentage, setPercentage] = useState(0);
  let [token, setToken] = useState(null);
  let [aiResult, setAIResult] = useState(null);
  let [loading, setLoading] = useState(false);

  let captcha = useRef(null);

  const openai = async () => {
    if (token && token.length > 2000) {
      setLoading(true);
      try {
        const response = await axios.post("/api/openai", {
          token: token,
          dev: JSON.stringify(new Screen().load()),
          birthday: birthday.getTime(),
        });

        console.log(response.data);
        setAIResult(response.data.message);
      } catch (error) {
        console.log("openai: ", error);
      } finally {
        setLoading(false);
        setToken(null);
        captcha.current.resetCaptcha();
        return;
      }
    }

    window.alert("Você precisa responder se você é um robô.");
  };

  useEffect(() => {
    setTimeout(() => {
      setPercentage(
        (((new Date() - birthday) / 3471206400000) * 100).toFixed(19)
      );
    }, 40);
  }, [percentage]);

  const registerUser = (event) => {
    console.log("Screen: ", JSON.stringify(new Screen().load()));
    event.preventDefault(); // don't redirect the page
    // where we'll add our form logic
    console.log(event);

    if (event.target[0].value != "") {
      console.log("0", event.target[0].value);

      // Add a day
      const startDate = new Date(event.target[0].value);
      const day = 60 * 60 * 24 * 1000;
      const tmp = new Date(startDate.getTime() + day);
      setBirthday(tmp);
    }
  };

  return (
    <div className="bg-dark text-white text-center">
      <Head>
        <title>MyDeathApp</title>
        <meta name="description" content="MyDeathApp" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <iframe
        className="position-fixed top-50 start-50 translate-middle"
        style={{
          width: "120vw",
          height: "120vh",
        }}
        title="Crystal Ball"
        frameBorder="0"
        allowFullScreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        xr-spatial-tracking
        execution-while-out-of-viewport
        execution-while-not-rendered
        web-share
        src="https://sketchfab.com/models/d84eb6f3eeb24e37b142c6a042f3cdbc/embed?autospin=1&autostart=1&preload=1&ui_hint=0&ui_theme=dark"
      ></iframe>
      <main className="position-relative container d-flex justify-content-center align-items-center my-5 py-5">
        {!birthday ? (
          <form className="col-12 col-md-8" onSubmit={registerUser}>
            <div className="mb-3">
              <label className="form-label fs-2 mb-5 neo" htmlFor="date">
                {t("label-birthday")}
              </label>
              <input
                className="form-control bg-dark text-white border-dark btn-neo fs-2"
                type="date"
                id="date"
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-neo m-4 fs-2"
            >
              {t("submit-birthday")}
            </button>
          </form>
        ) : (
          <div>
            <p className="neo">
              {birthday.toLocaleDateString()} -{" "}
              {new Date().toLocaleDateString()}
            </p>
            <h1 className="neo">{percentage}%</h1>
            <p className="neo">{t("percentage-description")}</p>
            <br />

            <HCaptcha
              ref={captcha}
              className="mx-auto neo"
              sitekey="beac5b3a-986f-408c-8e17-f31e1dacdba2"
              onVerify={(token, ekey) => {
                setToken(token);
              }}
            />

            {aiResult ? (
              <>
                <p className="my-3 fs-5 neo">{aiResult}</p>
                {loading ? (
                  <button
                    className="btn btn-dark btn-lg btn-neo m-4"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("loading")}
                  </button>
                ) : (
                  <button
                    onClick={openai}
                    className="btn btn-dark btn-neo btn-lg m-4"
                  >
                    {t("repeat")}
                  </button>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <button
                    className="btn btn-dark btn-lg btn-neo m-4"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm mx-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("loading")}
                  </button>
                ) : (
                  <button
                    onClick={openai}
                    className="btn btn-dark btn-lg btn-neo m-4"
                  >
                    {t("first-call")}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </main>
      <ADSBlock />
      <Ads />
      <footer></footer>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
