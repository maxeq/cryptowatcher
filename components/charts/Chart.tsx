import React from 'react';
import { Line } from 'react-chartjs-2';
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

interface ChartsProps {
  cryptoName: string;
  cryptoArray: number[];
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

export default function Charts({ cryptoName, cryptoArray }: ChartsProps): JSX.Element {

  const labels = Array.from({ length: cryptoArray?.length ?? 0 }, (_, i) => i.toString());

  const data = {
    labels,
    datasets: [
      {
        label: 'Price History',
        data: [],
        borderColor: 'rgb(163 230 53)',
        backgroundColor: 'rgb(163 230 53, 0.5)',
        pointRadius: 0,
        borderWidth: 2,

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
              data: cryptoArray,
              label: cryptoName,
            },
          ],
        }}
      />
    </div>
  );
}
