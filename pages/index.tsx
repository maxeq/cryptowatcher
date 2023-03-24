import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import NoSSR from '../components/layouts/NoSSR';
import H1Template from '@/components/UI/HeaderTemplate';
import CryptoTableList from '@/components/UI/CryptoTable';
import SliderData from '@/components/sliders/SliderData';

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <H1Template text="Today's Cryptocurrency Prices Overview" />
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
    </NoSSR>
  );
};

export default Cryptocurrencies;
