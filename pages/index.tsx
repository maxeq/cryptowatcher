import React from "react";
import type { NextPage } from "next";

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import Ticker from "../components/Ticker";

const Home: NextPage = () => {
  return (
    <NoSSR>
      <Layout>
        <div className="py-24 sm:py-24 lg:py-10">
          <div className="mx-auto max-w-7xl px-2 lg:px-4">
          <h1 className="title">Cryptocurrency Market Overview</h1>
            <Ticker />

            {/* TODO: footer code */}
          </div>
        </div>
      </Layout>
    </NoSSR>
  );
};

export default Home;