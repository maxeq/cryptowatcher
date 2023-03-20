import Head from 'next/head';

export default function Trade() {
  return (
    <div>
      <Head>
        <title>CryptoWatcher Trade</title>
        <meta name="description" content="CryptoWatcher Trade" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex">
          <div className="w-3/5">
            <div className="flex justify-between">
              <div>BNB/ETH</div>
              <div >Expand</div>
            </div>
            <div></div>
            <div></div>
          </div>
          <div className="w-2/5">
            Trade
            <div className="bg-white rounded-lg shadow-lg p-80"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
