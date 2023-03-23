import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NoSSR from '../components/layouts/NoSSR';
import Dashboard from '@/components/UI/Dashboard';
import ChartFetcher from '@/components/charts/ChartFetcher';
import H1Template from '@/components/UI/HeaderTemplate';
import Comments from '@/components/Comments';
import Twitter from '@/components/TwitterHandler';

const Cryptocurrencies_dynamic: NextPage = () => {
  const router = useRouter();
  const ids = Array.isArray(router.query.ids)
    ? router.query.ids[0]
    : router.query.ids;

  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <Dashboard />
      <div className="md:grid md:grid-cols-3 md:gap-4 py-4 md:py-8 mx-auto">
        <div className="col-span-2">
          {' '}
          <H1Template text={`${ids?.toUpperCase()} 24H CHART`} />
          <ChartFetcher _id={ids} showXLabel={true} showYLabel={true} />
        </div>
        <div className="col-span-1 bg-gray-800 rounded-2xl s shadow-lg md:ml-6">
          <Twitter />
          <Comments />
        </div>
      </div>
    </NoSSR>
  );
};

export default Cryptocurrencies_dynamic;
