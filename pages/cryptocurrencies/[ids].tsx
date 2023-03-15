import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from 'next/router';

import NoSSR from "../../components/NoSSR";
import Dashboard from "@/components/Dashboard";
import ChartFetcher from "@/components/charts/ChartFetcher";
import H1Template from "@/components/h1template";
import Logo from "@/components/LogoNew";
import Button from "@/components/Button";


const Cryptocurrencies_dynamic: NextPage = () => {
  const router = useRouter();
  const ids = Array.isArray(router.query.ids) ? router.query.ids[0] : router.query.ids;
  console.log(router)

  const [selectedBtn, setSelectedBtn] = useState('top');

  return (
    <NoSSR>
      <Head>
        <title>Cryptocurrencies</title>
      </Head>
      <Dashboard />
      <div className="md:grid md:grid-cols-3 md:gap-4 py-4 md:py-8 mx-auto">
        <div className="col-span-2"> <H1Template text={`${ids?.toUpperCase()} 24H CHART`} />
          <ChartFetcher _id={ids} showXLabel={true} showYLabel={true} />
        </div>
        <div className="col-span-1 bg-gray-800 rounded-2xl s shadow-lg md:ml-6">
          <div className="top mx-4 mt-4 md:mx-6 md:my-2 flex items-center justify-between">
            <Logo size={64} /> <div className="">CryptoWatcher</div><Button text="+ Follow" />
          </div>
          <div className="min-h-32 flex flex-col">
            <div className="bg-gray-900 p-16"> <div className="mx-8"><Button text="Login to discuss" /></div></div>

            <div className="border md:rounded border-slate-700 text-slate-600 md:mx-10 mx-6 my-4">
              <form className="flex justify-evenly my-1 md:px-20">
                <button
                  type="button"
                  className={`border ${selectedBtn === 'top' ? 'text-white border-transparent bg-slate-600 rounded px-14 flex items-center ' : 'hover:text-slate-100 px-14 flex items-center border-transparent transition duration-300 ease-in-out'}`}
                  onClick={() => setSelectedBtn('top')}>
                  Top
                </button>
                <button
                  type="button"
                  className={`border ${selectedBtn === 'latest' ? 'text-white border-transparent bg-slate-600 rounded px-14 flex items-center' : 'hover:text-slate-100 px-14 flex items-center border-transparent transition duration-300 ease-in-out'}`}
                  onClick={() => setSelectedBtn('latest')}>
                  Latest
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </NoSSR >
  );
};

export default Cryptocurrencies_dynamic;
