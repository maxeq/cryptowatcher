import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import NoSSR from "../../components/layouts/NoSSR";
import H1Template from '@/components/UI/H1template'
import CryptoTableList from "@/components/UI/CryptoTable";

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <H1Template text="Cryptocurrency Market Overview" />
      <CryptoTableList />
    </NoSSR>
  );
};

export default Cryptocurrencies;