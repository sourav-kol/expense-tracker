"use client";

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { DefaultCategory } from '@/src/constants/AppConstants';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartData } from '@/src/types';
import { generateDistinctColors } from '@/src/helper/generateColors';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  chartData: ChartData[];
}

export const DonutChart = (prop: Props) => {
  const { chartData } = prop;
  const [dataSet, setData] = useState<string[]>([]);
  const [chartLabel, setChartLabel] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    if (dataSet && chartLabel) {
      setData(chartData?.map(item => item.part.toString()));
      setChartLabel(chartData?.map(item => item.category));
      setColors(generateDistinctColors(chartData?.length || 0));
    }
    
  }, [chartData]);
  
  const data = {
    labels: chartLabel.map(item => DefaultCategory[item] || item),
    datasets: [
      {
        data: chartData?.map(item => parseInt(item.part)),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
        borderWidth: 1
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#ffffff'
        }
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            return `${`${DefaultCategory[chartData[context.dataIndex].category]}`}: ${chartData[context.dataIndex].totalAmount}`;
          },
          title: function () {
            return `Category:`;
          }
        }
      },
    }
  };

  return <Doughnut data={data} options={options} />;
};

