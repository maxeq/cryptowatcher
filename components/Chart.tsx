import React from 'react';
import { Line } from 'react-chartjs-2';
import { useBinanceTicker } from '../utils/binancehook';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            display: false,
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

export default function Charts({ symbol }: { symbol: string }): JSX.Element {
    const cryptocurrenciesBinance = useBinanceTicker();
  
    // Find the cryptocurrency object that matches the symbol prop
    const crypto = cryptocurrenciesBinance.find(
      (c: BinanceHookProp["crypto"]) => c.symbol === symbol
    );
  
    if (!crypto) {
      return <div>No data available for symbol {symbol}</div>;
    }
  
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
      <div>
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
    );
  }