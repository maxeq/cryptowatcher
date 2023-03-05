import React from 'react';
import { Line } from 'react-chartjs-2';
import { useBinanceTicker } from '../utils/binancehook';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface BinanceHookProp {
    crypto: {
        priceBinance: number;
        priceHistoryBinance: number[];
        symbol: string;
    };
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
    },
};

export default function Charts() {
    const cryptocurrenciesBinance = useBinanceTicker();

    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    const data = {
        labels,
        datasets: [
            {
                label: 'Price History',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    
    return (
        <>
            {cryptocurrenciesBinance.map((crypto: BinanceHookProp["crypto"], index: number) => (
                <div key={index}>
                    <p>Symbol: {crypto.symbol}</p>
                    <p>Price: {crypto.priceBinance}</p>
                    <p>Price History: {crypto.priceHistoryBinance}</p>
                    <Line
                        options={options}
                        data={{
                            ...data,
                            datasets: [
                                {
                                    ...data.datasets[0],
                                    data: crypto.priceHistoryBinance,
                                    label: crypto.symbol,
                                },
                            ],
                        }}
                    />
                </div>
            ))}
        </>
    );
}
