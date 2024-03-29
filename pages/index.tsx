import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import H1Template from '@/components/UI/HeaderTemplate';
import CryptoTableList from '@/components/UI/cryptotable/CryptoTable';
import SliderData from '@/components/sliders/SliderData';

const Cryptocurrencies: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <H1Template text="Today's Cryptocurrency Prices Overview" className="mt-4 md:mt-0" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="hidden sm:block">
          <SliderData sliderTypes={['trending']} />
        </div>
        <div className="hidden sm:block">
          <SliderData sliderTypes={['biggestLosers']} />
        </div>
        <div className="hidden sm:block">
          <SliderData sliderTypes={['topGainers']} />
        </div>
      </div>
      <CryptoTableList />
    </>
  );
};

export default Cryptocurrencies;
