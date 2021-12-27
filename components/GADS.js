import Script from "next/script";

export default function GADS() {
  return (
    <Script
      async
      src={
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
        process.env.GADS
      }
      crossorigin="anonymous"
    ></Script>
  );
}
