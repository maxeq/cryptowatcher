import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ObjectId } from 'mongodb';
import { getCustomers } from '../pages/api/customers/index';
import React from 'react';
import Charts from '@/components/charts/Chart'

import NoSSR from "../components/NoSSR";
import Layout from "../components/Layout";
import H1Template from '@/components/h1template'


export type Customer = {
    _id: ObjectId;
    symbol: string;
    current_price: number;
    array_current_price: number[];
};

export const getStaticProps: GetStaticProps = async (context) => {
    const data = await getCustomers();

    return {
        props: {
            customers: data,
        },
        revalidate: 60,
    };
};

const Customers: NextPage = ({ customers }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <NoSSR>
            <Layout>
                <H1Template text="CryptoWatcher never sleeps. Built by diamond hands." />

                <div>
                    <ul>
                        {customers.map((customer: Customer) => (
                            <li key={customer._id.toString()}>
                                <h3>{customer._id.toString()}</h3>
                                <p>{customer.array_current_price}</p>
                                <Charts cryptoName={customer._id.toString()} cryptoArray={customer.array_current_price} />

                            </li>
                        ))}
                    </ul>
                </div>
            </Layout>
        </NoSSR>
    );
};

export default Customers;