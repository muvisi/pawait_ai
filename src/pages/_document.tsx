import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAYzbaBwH-K7lNtr5kxb_TWSAV-TDuVDE&libraries=places"
          defer
        ></script>

        <script src="https://editor.unlayer.com/embed.js" defer></script>
        <script src="https://cdn.quilljs.com/1.3.6/quill.js" defer />
        <link
          href="https://cdn.quilljs.com/1.3.6/quill.snow.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
