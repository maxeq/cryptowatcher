import React from "react";
import type { NextPage } from "next";

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import Ticker from "../components/Ticker";
import H1Template from '@/components/h1template'
import Crypto_table from "@/components/Crypto_table";

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <Layout>
      <H1Template text="Cryptocurrency Market Overview" />
      <Crypto_table />
      </Layout>
    </NoSSR>
  );
};

export default Cryptocurrencies;