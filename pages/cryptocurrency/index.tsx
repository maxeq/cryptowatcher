import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import NoSSR from "../../components/NoSSR";
import H1Template from '@/components/h1template'
import Crypto_table from "@/components/Crypto_table";

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <H1Template text="Cryptocurrency Market Overview" />
      <Crypto_table />
    </NoSSR>
  );
};

export default Cryptocurrencies;