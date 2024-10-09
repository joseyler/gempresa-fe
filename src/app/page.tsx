"use client"
import React, { useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from "react-chartjs-2";
import styles from "./page.module.css";

export default function Home() {

  Chart.register(...registerables);


  const scales = {
    y: {
      ticks: {
        beginAtZero: true,
        callback(value: number) {
          const formattedValue = (value).toString().replace('-', '');
          if (value >= 0) {
            return `$${formattedValue}`;
          }
          return `-$${formattedValue}`;
        },
      },
    },
    x: {
      ticks: {
        font: {
          size: 10.5,
        },
      },
    },
  };

  const [configChart] = useState({
    plugins: {
      maintainAspectRatio: false,
      title: "Gempresa Stock Values",
      legend: {
        position: 'top',
        align: 'center',
      },
    },
    scales,
    responsive: true,
    maintainAspectRatio: false,
  });

  const dataChart = () => {
    const dataChart = {
      labels: ['2024-04-01', '2024-04-02', '2024-04-03'
        ,'2024-04-04', '2024-04-05', '2024-04-06'
        ,'2024-04-07', '2024-04-08', '2024-04-09'
        ,'2024-04-10', '2024-04-11', '2024-04-12'
        ,'2024-04-13', '2024-04-14', '2024-04-15'
      ],
      datasets: [
        {
          label: 'Amazon',
          data: [18, 20, 22, 18, 20, 22, 23, 23, 24, 23, 23, 24, 25, 28, 32],
          hoverOffset: 4,
          backgroundColor: 'yellow',
          borderColor: 'yellow',
        }, {
          label: 'Tesla',
          data: [33, 32, 34, 33, 32, 34, 33, 32, 34, 33, 32, 34, 33, 32, 34],
          hoverOffset: 4,
          backgroundColor: 'blue',
          borderColor: 'blue',
        }
      ],
    }
    return dataChart;
  };


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ backgroundColor: 'white' }}>
          <Line
            options={configChart}
            data={dataChart()}
            width="800px"
          />
        </div>
      </main >
    </div >
  );
}
