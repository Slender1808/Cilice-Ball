import axios from "axios";
import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/image";

export default function Home() {
  let [birthday, setBirthday] = useState(false);
  let [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercentage(
        (((new Date() - birthday) / 3471206400000) * 100).toFixed(20)
      );
    }, 40);
  }, [percentage]);

  async function postLocation(date) {
    try {
      const response = await axios.get("http://demo.ip-api.com/json/", {
        params: {
          fields: 66846719,
          lang: "en",
        },
      });
      console.log(response);
      const location = response.data;

      const data = {
        fields: {
          status: { stringValue: String(location.status) },
          continent: { stringValue: String(location.continent) },
          continentCode: { stringValue: String(location.continentCode) },
          country: { stringValue: String(location.country) },
          countryCode: { stringValue: String(location.countryCode) },
          region: { stringValue: String(location.region) },
          regionName: { stringValue: String(location.regionName) },
          city: { stringValue: String(location.city) },
          district: { stringValue: String(location.district) },
          zip: { stringValue: String(location.zip) },
          geo: {
            geoPointValue: { latitude: location.lat, longitude: location.lon },
          },
          timezone: { stringValue: String(location.timezone) },
          offset: { timestampValue: String(new Date().toISOString()) },
          currency: { stringValue: String(location.currency) },
          isp: { stringValue: String(location.isp) },
          org: { stringValue: String(location.org) },
          as: { stringValue: String(location.as) },
          asname: { stringValue: String(location.asname) },
          reverse: { stringValue: String(location.reverse) },
          mobile: { booleanValue: Boolean(location.mobile) },
          proxy: { booleanValue: Boolean(location.proxy) },
          hosting: { booleanValue: Boolean(location.hosting) },
          query: { stringValue: String(location.query) },
          birthday: { timestampValue: String(date.toISOString()) },
        },
      };

      console.log(data);

      try {
        const response = await axios.post(
          "https://firestore.googleapis.com/v1/projects/mydeathapp/databases/(default)/documents/ip-api",
          data
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const registerUser = (event) => {
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

      postLocation(tmp);
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
                <label className="form-label" htmlFor="date">
                  Marque a data do seu aniversário:
                </label>
                <input
                  className="form-control bg-dark text-white border-dark dark-u "
                  type="date"
                  id="date"
                />
              </div>
              <button type="submit" className="btn btn-dark btn-lg dark-u m-4">
                Calcular
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
            </div>
          )}
        </form>
      </main>

      <footer></footer>
    </div>
  );
}
