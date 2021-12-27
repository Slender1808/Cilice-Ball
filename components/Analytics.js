import Script from "next/script";

export default function Analytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-FF6L5JYNL7`}
      />
      <Script id="gtag-script" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FF6L5JYNL7', {
        page_path: window.location.pathname,
      });
    `}</Script>
    </>
  );
}
