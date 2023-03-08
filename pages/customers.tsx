import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { ObjectId } from 'mongodb';
import { getCustomers } from '../pages/api/customers/index';
import React from 'react';
import Charts from '@/components/Chart'

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
    );
};

export default Customers;