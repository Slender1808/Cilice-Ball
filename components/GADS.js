import Script from "next/script";

export default function GADS() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7540935582112706"
      crossorigin="anonymous"
    ></Script>
  );
}
