"use client";

import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

import { BarChartData } from '@/src/types';

import { Months } from '@/src/constants/AppConstants';

type Props = {
  chartData: BarChartData[];
}

export const BarChart = (prop: Props) => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  const data = {
    labels: prop.chartData.map(item => Months[parseInt(item.month.split('-')[1])-1]),
    datasets: [
      {
        label: 'Expenses',
        data: prop.chartData.map(item => item.totalAmount),
        backgroundColor: 'rgb(0, 217, 255)',
        borderRadius: 6,
        barThickness: 28
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255,255,255,1)',
        },
        position: 'top' as const,
      },
      title: {
        color: 'rgba(255,255,255, 0.8)',
        display: true,
        text: 'Monthly Expenses',
        font: {
          size: 20,
          weight: 'bold',
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(255,255,255, 1)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(255,255,255, 1)',
          callback: (value: number) => `₹ ${value}`,
        },
      },
    },
  };

  //@ts-ignore
  return <Bar data={data} options={options} />;
}
