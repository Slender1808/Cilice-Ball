import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Head from "next/head";

import HCaptcha from "@hcaptcha/react-hcaptcha";

import Screen from "../lib/Screen";


export default function Home() {
  let [birthday, setBirthday] = useState(false);
  let [percentage, setPercentage] = useState(0);
  let captcha = useRef(null);
  const [token, setToken] = useState(null);

  const openai = async () => {
    if (token && token.length > 2000) {
      try {
        const response = await axios.post("/api/openai", {
          token: token,
          dev: JSON.stringify(new Screen().load()),
          birthday: birthday.getTime(),
        });

        setResult(response.data.generated_text);

        setToken(null);
        captcha.current.resetCaptcha();
      } catch (error) {
        console.log(error);
      }
      return;
    }

    window.alert("Você precisa responder se você é um robô.");
  };

  useEffect(() => {
    setTimeout(() => {
      setPercentage(
        (((new Date() - birthday) / 3471206400000) * 100).toFixed(20)
      );
    }, 40);
  }, [percentage]);

  const registerUser = (event) => {
    console.log("Screen: ",JSON.stringify(new Screen().load()))
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

      <main className="container position-absolute top-50 start-50 translate-middle">
        <form onSubmit={registerUser}>
          {!birthday ? (
            <>
              <div className="mb-3">
                <label className="form-label fs-2 mb-5" htmlFor="date">
                  Marque o seu aniversário.
                </label>
                <input
                  className="form-control bg-dark text-white border-dark dark-u fs-2"
                  type="date"
                  id="date"
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg dark-u m-4 fs-2">
                Revelar
              </button>
            </>
          ) : (
            <div>
              <p>
                {birthday.toLocaleDateString()} -{" "}
                {new Date().toLocaleDateString()}
              </p>
              <h1>{percentage}%</h1>
              <p>Chance de você morrer agora</p>
              <br />

              <button
                onClick={openai}
                className="btn btn-dark btn-lg dark-u m-4"
              >
                Descubra como sua morte pode ser
              </button>

              <HCaptcha
                ref={captcha}
                className="mx-auto"
                sitekey="beac5b3a-986f-408c-8e17-f31e1dacdba2"
                onVerify={(token, ekey) => {
                  setToken(token);
                }}
              />

              <button
                className="btn btn-dark btn-lg dark-u m-4"
                onClick={() => {
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "MyDeathApp",
                        text: "find chance you die now",
                        url: "https://mydeathapp.vercel.app/",
                      })
                      .then(() => console.log("Successful share"))
                      .catch((error) => console.log("Error sharing", error));
                  }
                }}
              >
                Compartilhar
              </button>
            </div>
          )}
        </form>
      </main>

      <footer></footer>
    </div>
  );
}
