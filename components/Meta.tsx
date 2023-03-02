import Head from "next/head";

function Meta() {
  return (
    <Head>
      <title>CryptoWatcher stays hunting the Whales</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Watch the price of cryptocurrencies in real time"
      />
      <meta
        name="keywords"
        content="crypto, cryptocurrency, price, tracker, app, code, bitcoin, etherium, litecoin, dogecoin"
      />
      <meta name="author" content="maxonx" />
      <meta
        name='msapplication-TileImage'
      />

      {/* Open Graph Tags */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content='Crypto Price Tracker App' />
      <meta
        property='og:description'
        content='Watch the price of cryptocurrencies in real time'
      />
      <meta
        property='og:url'
        content='https://t.me/more_media'
      />
      <meta property='og:site_name' content='Code of Relevancy' />
      <meta property='og:image' content='/code-of-relevancy-logo.png' />
      <meta property='og:image:width' content='200' />
      <meta property='og:image:height' content='200' />
      <meta property='og:locale' content='en_US' />

      <meta name='twitter:title' content='CryptoWatcher stays hunting the Whales' />
      <meta
        name='twitter:description'
        content='CryptoWatcher website developed by @more_media'
      />
      <meta name='telegram:site' content='@more_media' />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

export default Meta;