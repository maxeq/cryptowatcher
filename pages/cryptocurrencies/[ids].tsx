import React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import NoSSR from "../../components/NoSSR";
import Dashboard from "@/components/Dashboard";

const Cryptocurrencies_dynamic: NextPage = () => {
    return (
        <NoSSR>
            <Head>
                <title>Cryptocurrencies</title>
            </Head>
            <Dashboard />
            </NoSSR>
    );
};


export default Cryptocurrencies_dynamic;