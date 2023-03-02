import React from "react";
import type { NextPage } from "next";

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import Ticker from "../components/Ticker";
import H1Template from '@/components/h1template'
import Header from '@/components/header'

const Home: NextPage = () => {
  return (
    <NoSSR>
      <Layout>
      <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />
            <Ticker />
      </Layout>
    </NoSSR>
  );
};

export default Home;