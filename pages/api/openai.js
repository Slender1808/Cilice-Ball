import axios from "axios";
import qs from "qs";
import parser from "ua-parser-js";

const postData = async (data) => {
  try {
    const response = await axios.post(
      "https://firestore.googleapis.com/v1/projects/mydeathapp/databases/(default)/documents/ip-api",
      {
        fields: {
          key: {
            stringValue: process.env.FIREBASE,
          },
          dateString: {
            stringValue: data,
          },
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log("postData: ",error.message);
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
  let texto = `\nbirthday: ${data.birthday.toLocaleDateString()}\nage: ${
    new Date().getFullYear() - data.birthday.getFullYear()
  }`;

  if (data.dev.browser.name) {
    texto += "\nbrowser: " + data.dev.browser.name;
  }
  if (data.dev.os.name) {
    texto += "\noperational system: " + data.dev.os.name;
  }
  if (data.dev.cpu.architecture) {
    texto += "\nprocessor architecture: " + data.dev.cpu.architecture;
  }
  if (data.dev.hardwareConcurrency) {
    texto += "\nprocessor cores number: " + data.dev.hardwareConcurrency;
  }
  if (data.dev.deviceMemory) {
    texto += "\namount of RAM memory: " + data.dev.deviceMemory;
  }
  if (data.dev.resolution) {
    texto += "\nmonitor resolution: " + data.dev.resolution;
  }
  if (data.dev.languages) {
    texto += "\nlanguages: " + data.dev.languages[0];
  }

  if (data.location.continent) {
    texto += "\ncontinent: " + data.location.continent;
  }
  if (data.location.country) {
    texto += "\ncountry: " + data.location.country;
  }
  if (data.location.regionName) {
    texto += "\nregion: " + data.location.regionName;
  }
  if (data.location.city) {
    texto += "\ncity: " + data.location.city;
  }
  if (data.location.district) {
    texto += "\ndistrict: " + data.location.district;
  }
  if (data.location.zip) {
    texto += "\nzip: " + data.location.zip;
  }
  if (data.location.latitude) {
    texto += "\nlatitude: " + data.location.lat;
  }
  if (data.location.longitude) {
    texto += "\nlongitude: " + data.location.lon;
  }
  if (data.location.timezone) {
    texto += "\ntimezone: " + data.location.timezone;
  }
  if (data.location.currency) {
    texto += "\ncurrency: " + data.location.currency;
  }

  texto += "\n\nanalyzing the data how could my death be?\n";

  let body = {
    prompt: texto,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  };

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

    console.log(texto, response.data.choices[0].text);
    return { input: texto, output: response.data.choices[0].text };
  } catch (error) {
    console.log(error.message);
    return { message: error.message };
  }
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

                 
                  postData(
                    JSON.stringify({
                      ai: ai,
                      location: location,
                      dev: { ...AgentDev, ...dev },
                      agent: req.headers["user-agent"],
                      ip: ip,
                      birthday: birthday,
                    })
                  );

                  res.json({ message: ai.output });
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
