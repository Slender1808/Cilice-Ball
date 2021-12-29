import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import { Form, Button } from "react-bootstrap";

import Screen from "../lib/Screen";
const Ads = dynamic(() => import("../components/adaround"), { ssr: false });

function Home() {
  const { t } = useTranslation("common");

  let [birthday, setBirthday] = useState(false);
  let [token, setToken] = useState("");
  let [aiResult, setAIResult] = useState(null);
  let [loading, setLoading] = useState(false);
  let [validated, setValidated] = useState(false);
  let [question, setQuestion] = useState("");

  let captcha = useRef(null);

  const handleSubmit = async (event) => {
    setValidated(true);
    const form = event.currentTarget;

    console.log("Screen: ", JSON.stringify(new Screen().load()));

    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() != false) {
      const date = new Date(event.target[0].value);
      const text = event.target[1].value;

      // Add a day
      setBirthday(new Date(date.getTime() + 60 * 60 * 24 * 1000));

      // API

      if (token && token.length > 2000) {
        setLoading(true);
        try {
          const response = await axios.post("/api/oracle", {
            token: token,
            dev: JSON.stringify(new Screen().load()),
            birthday: date.getTime(),
            question: text,
          });

          console.log(response.data);
          setAIResult(response.data.message);
        } catch (error) {
          console.log("api: ", error);
        } finally {
          setLoading(false);
          setToken("");
          captcha.current.resetCaptcha();
        }
      }
    }
  };

  return (
    <div className="bg-dark text-white text-center">
      <Head>
        <title>CiliceBall</title>
        <meta name="description" content="CiliceBall" />
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
      <div className="position-relative ">
        <main className="container d-flex flex-column justify-content-center align-items-center my-5 py-5">
          <Form
            noValidate
            validated={validated}
            className="col-12 col-md-8"
            onSubmit={handleSubmit}
          >
            <Form.Group
              className="mb-3 col-8 mx-auto"
              controlId="validationBirthday"
            >
              <Form.Label className="fs-3 mb-5 neo">
                {t("label-birthday")}
              </Form.Label>
              <Form.Control
                className="text-white btn-neo fs-2"
                name="birthday"
                type="date"
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid" className="neo-r">
                {t("feedback")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationText">
              <Form.Label className="fs-3 my-3 neo">{t("question")}</Form.Label>
              <Form.Control
                className="text-white btn-neo fs-4"
                as="textarea"
                name="question"
                rows={5}
                maxLength="128"
                required
              />
              <Form.Control.Feedback type="invalid" className="neo-r">
                {t("feedback")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="pb-3 text-center"
              controlId="validationCaptcha"
            >
              <Form.Control
                className="invisible"
                type="text"
                name="token"
                value={token}
                required
              />
              <HCaptcha
                ref={captcha}
                sitekey="beac5b3a-986f-408c-8e17-f31e1dacdba2"
                onVerify={(token, ekey) => {
                  setToken(token);
                }}
              />
              <Form.Control.Feedback type="invalid" className="neo-r">
                {t("feedback")}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="col-12 text-center my-3">
              <Button
                className="d-flex align-items-center mx-auto btn-neo"
                variant="dark"
                size="lg"
                type="submit"
              >
                {loading ? (
                  <>
                    <span
                      className="mx-3 spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {t("loading")}
                  </>
                ) : (
                  <>{t("first-call")}</>
                )}
              </Button>
            </div>
          </Form>
          <div className="col-12 p-2">
            <h5 className="my-3 neo">{aiResult}</h5>
          </div>
        </main>
        <footer className="footer text-center align-middle my-3">
          <Link
            href="https://github.com/Slender1808/Cilice-Ball"
            target="_blank"
            rel="noopener noreferrer"
          >
            <a style={{ textDecoration: "none" }}>
              <h3 className="neo">Source code</h3>
            </a>
          </Link>
        </footer>
        <Ads />
      </div>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
