import Script from "next/script";

export default function ADSBlock() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7540935582112706"
        crossorigin="anonymous"
      ></Script>

      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7540935582112706"
        data-ad-slot="4899760892"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="ads-block" strategy="lazyOnload">
        {`
     (adsbygoogle = window.adsbygoogle || []).push({});
     `}
      </Script>
    </>
  );
}
