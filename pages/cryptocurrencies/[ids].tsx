import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router';

import NoSSR from "../../components/NoSSR";
import Dashboard from "@/components/Dashboard";
import ChartFetcher from "@/components/charts/ChartFetcher";


const Cryptocurrencies_dynamic: NextPage = () => {
  const router = useRouter();
  const ids = Array.isArray(router.query.ids) ? router.query.ids[0] : router.query.ids;
  console.log(router)
  
  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <Dashboard />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ChartFetcher _id={ids} />
        </div>
        <div className="col-span-1">Sidebar content</div>
      </div>
    </NoSSR>
  );
};

export default Cryptocurrencies_dynamic;
