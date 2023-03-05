import React from 'react';
import { Line } from 'react-chartjs-2';
import { useBinanceTicker } from '../utils/binancehook';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            position: 'left' as const,
        },
    },
    scales: {
        x: {
            display: false,
        },
        y: {
            display: false,
        },
    },
};

export default function Charts() {
    const cryptocurrenciesBinance = useBinanceTicker();

    const labels = Array.from({ length: 100 }, (_, i) => i.toString());

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
