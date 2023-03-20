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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend);

interface ChartsProps {
  id: string;
  cryptoArray: number[];
  showXLabel?: boolean;
  showYLabel?: boolean;
}

export default function Charts({
  id,
  cryptoArray,
  showXLabel,
  showYLabel,
}: ChartsProps): JSX.Element {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
    },
    scales: {
      x: {
        display: !!showXLabel,
        title: {
          display: !!showXLabel,
          text: showXLabel ? 'Time' : '',
        },
      },
      y: {
        display: !!showYLabel,
        title: {
          display: !!showYLabel,
          text: showYLabel ? 'Price' : '',
        },
      },
    },
  };

  const labels = Array.from({ length: cryptoArray?.length ?? 0 }, (_, i) =>
    i.toString()
  );

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
    <Line
      options={options}
      data={{
        ...data,
        datasets: [
          {
            ...data.datasets[0],
            data: cryptoArray,
            label: id,
          },
        ],
      }}
    />
  );
}
