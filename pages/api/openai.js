import axios from "axios";
import qs from "qs";
import parser from "ua-parser-js";

const postData = async (data) => {
  let tmp = {
    fields: {
      key: {
        stringValue: process.env.FIREBASE,
      },
      status: { stringValue: String(data.status) },
      continent: { stringValue: String(data.continent) },
      continentCode: { stringValue: String(data.continentCode) },
      country: { stringValue: String(data.country) },
      countryCode: { stringValue: String(data.countryCode) },
      region: { stringValue: String(data.region) },
      regionName: { stringValue: String(data.regionName) },
      city: { stringValue: String(data.city) },
      district: { stringValue: String(data.district) },
      zip: { stringValue: String(locadatation.zip) },
      geo: {
        geoPointValue: {
          latitude: data.lat,
          longitude: data.lon,
        },
      },
      timezone: { stringValue: String(data.timezone) },
      offset: { timestampValue: String(new Date().toISOString()) },
      currency: { stringValue: String(data.currency) },
      isp: { stringValue: String(data.isp) },
      org: { stringValue: String(data.org) },
      as: { stringValue: String(data.as) },
      asname: { stringValue: String(data.asname) },
      reverse: { stringValue: String(data.reverse) },
      mobile: { booleanValue: Boolean(data.mobile) },
      proxy: { booleanValue: Boolean(data.proxy) },
      hosting: { booleanValue: Boolean(data.hosting) },
      query: { stringValue: String(data.query) },
      birthday: { timestampValue: String(data.birthday.toISOString()) },
      agent: { stringValue: String(data.agent) },
      ip: { stringValue: String(data.ip) },
      screen: { stringValue: String(data.ip) },
    },
  };

  console.log(tmp);

  try {
    const response = await axios.post(
      "https://firestore.googleapis.com/v1/projects/mydeathapp/databases/(default)/documents/ip-api",
      tmp
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    return { message: error.message };
  }
};

const captchaCheck = async (token) => {
  try {
    const captcha = await axios({
      method: "post",
      url: "https://hcaptcha.com/siteverify",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        response: token,
        secret: process.env.SECRET_HCAPTCHA,
      }),
    });

    return captcha.data;
  } catch (error) {
    console.log("error.captcha", error.response.data);

    return { message: "error.captcha" };
  }
};

const getLocation = async (ip) => {
  try {
    const response = await axios.get("http://demo.ip-api.com/json/" + ip, {
      params: {
        fields: 66846719,
        lang: "en",
      },
    });

    return response.data;
  } catch (error) {
    console.log("getLocation: ", error);
    return { message: error.message };
  }
};

const getAI = async (data) => {
  console.log("getAI: ", data);

  let texto = new String();
  texto =
    texto +
    "\\nbirthday: " +
    data.birthday.toISOString() +
    "\\nage: " +
    new Date().getFullYear() -
    data.birthday.getFullYear(); /* +
  "\\ndevice: " +
  data.agent*/

  if (data.location.continent) {
    texto.concat("\\ncontinent: " + data.location.continent);
  }
  if (data.location.country) {
    texto.concat("\\ncountry: " + data.location.country);
  }
  if (data.location.regionName) {
    texto.concat("\\nregion: " + data.location.regionName);
  }
  if (data.location.city) {
    texto.concat("\\ncity: " + data.location.city);
  }
  if (data.location.district) {
    texto.concat("\\ndistrict: " + data.location.district);
  }
  if (data.location.zip) {
    texto.concat("\\nzip: " + data.location.zip);
  }
  if (data.location.latitude) {
    texto.concat("\\nlatitude: " + data.location.lat);
  }
  if (data.location.longitude) {
    texto.concat("\\nlongitude: " + data.location.lon);
  }
  if (data.location.timezone) {
    texto.concat("\ntimezone: " + data.location.timezone);
  }
  if (data.location.currency) {
    texto.concat("\\ncurrency: " + data.location.currency);
  }

  console.log("texto", texto);

  const quest = "";

  let body = {
    prompt: "",
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

  body.prompt = body.prompt + query;

  /*
  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/engines/davinci-instruct-beta-v3/completions",
      headers: {
        Authorization: "Bearer " + process.env.OPENAI,
        "Content-Type": "application/json",
      },
      data: body,
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
    return { message: error.message };
  }*/
};

export default async function Openai(req, res) {
  if (req.method === "POST") {
    if (req.body) {
      if (req.body.dev && req.body.dev.length > 680) {
        const dev = JSON.parse(req.body.dev);
        const birthday = new Date(Number(req.body.birthday));
        if (birthday != "Invalid Date") {
          if (req.body.token && req.body.token.length > 2000) {
            try {
              await captchaCheck(req.body.token);

              try {
                const ip = "177.137.112.171"; // req.connection.remoteAddress.split(`:`).pop();
                console.log("ip:", ip);
                const location = await getLocation(ip);

                try {
                  const AgentDev = parser(req.headers["user-agent"]);

                  const ai = await getAI({
                    location: location,
                    dev: { ...AgentDev, ...dev },
                    agent: req.headers["user-agent"],
                    ip: ip,
                    birthday: birthday,
                  });

                  /*
                  try {
                    const AgentDev = JSON.stringify(
                      parser(req.headers["user-agent"]),
                      null,
                      "  "
                    );
                    console.log("AgentDev: ", AgentDev);

                    const data = {
                      ...location,
                      agentParser: AgentDev,
                      agent: req.headers["user-agent"],
                      ip: ip,
                      birthday: new Date(birthday),
                      screen: req.body.screen,
                    };

                    await postData(data);

                    //postData
                  } catch (error) {
                    res.status(500).json(error);
                  }*/
                  // getAI
                } catch (error) {
                  res.status(500).json(error);
                }
                //getLocation
              } catch (error) {
                res.status(500).json(error);
              }
              // captchaCheck
            } catch (error) {
              res.status(500).json(error);
            }
            //token
          } else {
            res.status(401).json({ message: "token not found" });
          }
          // birthday
        } else {
          res.status(401).json({ message: "birthday not found" });
        }
        //screen
      } else {
        res.status(401).json({ message: "screen not found" });
      }
      // Body
    } else {
      res.status(401).json({ message: "body not found" });
    }
    //method
  } else {
    res.status(401).json({ message: "method post" });
  }
}
