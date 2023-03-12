import React from "react";
import type { NextPage } from "next";

import NoSSR from "../components/NoSSR";
import H1Template from '@/components/h1template'
import Crypto_table from "@/components/Crypto_table";

const Cryptocurrencies: NextPage = () => {
  return (
    <NoSSR>
      <H1Template text="Cryptocurrency Market Overview" />
      <Crypto_table />
    </NoSSR>
  );
};

export default Cryptocurrencies;