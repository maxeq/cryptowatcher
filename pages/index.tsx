import React from "react";
import type { NextPage } from "next";

import Ticker from "../components/Ticker";
import H1Template from '@/components/h1template'

const Home: NextPage = () => {
  return (
    <>
      <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />
      <Ticker pageName="Crypto" />
    </>
  );
};

export default Home;