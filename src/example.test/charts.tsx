"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';

//register the elements for the Doughnut Chart. More info here: https://www.chartjs.org/docs/latest/getting-started/integration.html
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = () => {
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
        labels:{
          color: '#ffffff'
        }
      },
    }
  };

  return <Doughnut data={data} options={options} />;
};

