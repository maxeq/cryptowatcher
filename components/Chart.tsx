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
        priceHistoryBinance: { price: number; index: number }[];
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
 console.log(cryptocurrenciesBinance)
    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    const price = cryptocurrenciesBinance[0].priceBinance;
    console.log(price);

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => price),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <>
            <div>
                {cryptocurrenciesBinance.map((crypto: BinanceHookProp["crypto"], index: number) => (
                    <div key={index}>
                        <p>Price: {crypto.priceBinance}</p>
                        <p>Price History:</p>
                        <ul>
                            {crypto.priceHistoryBinance?.map((price: any, index: number) => (
                                <li key={index}>{`${index}: ${price.price.toFixed(2)}`}</li>
                            ))}
                        </ul>
                        <Line options={options} data={data} />
                    </div>
                ))}
            </div>
        </>
    );
}
