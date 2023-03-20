import React from 'react';
import type { NextPage } from 'next';

import H1Template from '@/components/UI/H1template';
import Head from 'next/head';
import CryptoCards from '@/components/UI/CryptoCards';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />
      <CryptoCards />
    </>
  );
};

export default Home;
