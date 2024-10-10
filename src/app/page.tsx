"use client"
import React from 'react';
import { Chart } from "react-google-charts";
import styles from "./page.module.css";

export default function Home() {

  //LINE CHART
  const dataLine = [
    ["Años", "Amazon", "Mercado libre", "Ebay"],
    ["2014", 1050, 560, 1000],
    ["2015", 860, 1090, 800],
    ["2016", 1070, 740, 600],
    ["2017", 1110, 660, 800],
    ["2018", 1040, 620, 1000],
    ["2019", 1020, 710, 100],
    ["2020", 920, 1220, 1000],
    ["2021", 1120, 850, 700],
    ["2022", 1080, 810, 892],
    ["2023", 1120, 820, 1000],
  ];

  const optionsLine = {
    chart: {
      title: "E-Stores",
      subtitle: "Tiendas con envios, por millon de dolares",
    },
    width: 950,
    height: 500,
    colors: ["#3498db", "#f4d03f", "#2ecc71"],
    curveType: "function",
    lineWidth: 4,
    pointSize: 7,
    legend: { position: "bottom" },
  };

  //PIE CHART

  const dataPie = [
    ["Companias", " Valor basado en porcentaje por millon de dolares"],
    ["Nvidia", 22,],
    ["Intel", 7],
    ["AMD", 13],
    ["Asus", 5],
    ["MSI", 6],
  ];

  const optionsPie = {
    title: "Companias de tecnologia",
    width: 950,
    height: 500,
    colors: ["#2ecc71", "#3498db", "#e74c3c", "#8e44ad", "#e67e22"],
  };


  //COLUMN CHART

 const dataColumn = [
    ["Elementos", "Densidad", { role: "style" }],
    ["Cobre", 8.94, "#b87333"],
    ["Plata", 10.49, "silver"],
    ["Oro", 19.3, "gold"],
    ["Platino", 21.45, "color: #e5e4e2"],
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Chart
          chartType="Line"
          data={dataLine}
          options={optionsLine}
        />
        <br></br>

<h1>{dataPie[0][0]},{dataPie[0][1]} </h1>
        <Chart
          chartType="PieChart"
          data={dataPie}
          options={optionsPie}
        />
        <br></br>

         <Chart chartType="ColumnChart" data={dataColumn} />
      </main >
    </div >
  );
}
