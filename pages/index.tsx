import React from "react";
import type { NextPage } from "next";

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import Ticker from "../components/Ticker";
import H1Template from '@/components/h1template'

const Home: NextPage = () => {
  return (
    <NoSSR>
      <Layout>
        <div className="py-24 sm:py-24 lg:py-10">
        <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />
          <div className="mx-auto max-w-7xl px-2 lg:px-4">
            <Ticker />
          </div>
        </div>
      </Layout>
    </NoSSR>
  );
};

export default Home;