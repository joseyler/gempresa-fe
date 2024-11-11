"use client"
import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import styles from "./page.module.css";
import DateMomentUtils from '../../utils/DateMomentUtils';


export default function Home() {

  const registros = DateMomentUtils.getRegistrosEntreFechas(
    { fecha: '2024-10-01', hora: '00:00' },
    { fecha: '2024-11-01', hora: '15:00' },
  );

  console.log(registros);

  //LINE CHART
  const dataLineHora = [
    ["hora", "NVIDIA", "AMD", "INTEL"],
    ...registros.map((registro) => [
      registro.hora,
      registro.cotizaciones.find((c: { empresa: string; }) => c.empresa === 'NVIDIA')?.valorAccion || 0,
      registro.cotizaciones.find((c: { empresa: string; }) => c.empresa === 'AMD')?.valorAccion || 0,
      registro.cotizaciones.find((c: { empresa: string; }) => c.empresa === 'INTEL')?.valorAccion || 0
    ])
  ];


  const optionsLine = {
    chart: {
      title: "Empresas de tecnologia",
      subtitle: "Valor de las acciones",
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

      <div>
    <button>Día</button>
    <button>Mes</button>
    <button>Año</button>
  </div>
        <Chart
          chartType="Line"
          data={dataLineHora}
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