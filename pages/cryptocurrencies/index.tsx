import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import NoSSR from '../../components/layouts/NoSSR';
import H1Template from '@/components/UI/HeaderTemplate';
import CryptoTableList from '@/components/UI/CryptoTable';
import CustomSlider from '@/components/TrendingSliders';

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <H1Template text="Cryptocurrency Market Overview" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CustomSlider />
        <CustomSlider />
        <CustomSlider />
      </div>
      <CryptoTableList />
    </NoSSR>
  );
};

export default Cryptocurrencies;
