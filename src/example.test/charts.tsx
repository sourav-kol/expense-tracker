"use client";

import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

//register the elements for the Doughnut Chart. More info here: https://www.chartjs.org/docs/latest/getting-started/integration.html
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";


export const PieChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ['Food', 'Shoppin', 'Bills'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top' as const, // 'top', 'bottom', 'left', 'right'
        labels: {
          color: '#ffffff'
        }
      },
    }
  };

  return <Doughnut data={data} options={options} />;
};


export const BarChart = () => {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 500, 400, 700, 600],
        backgroundColor: 'rgba(53, 162, 235, 0.7)',
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `₹${value}`,
        },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

