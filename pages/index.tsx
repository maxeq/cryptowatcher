import React from 'react';
import type { NextPage } from 'next';

import Ticker from '../components/Ticker';
import H1Template from '@/components/UI/H1template';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />
      <Ticker pageName="Crypto" />
    </>
  );
};

export default Home;
