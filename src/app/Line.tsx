"use client"; 

import {Chart, AxisOptions} from 'react-charts';
import { ReactElement, useMemo } from 'react';

// Define la interfaz para los datos
interface Datum {
  primary: Date;
  secondary: number;
}

const LineChart = (): ReactElement => {
  // Datos del gráfico
  const data = useMemo(
    () => [
      {
        label: 'Serie 1',
        data: [
          { primary: new Date(2024, 0, 1), secondary: 10 },
          { primary: new Date(2024, 1, 1), secondary: 15 },
          { primary: new Date(2024, 2, 1), secondary: 20 },
          { primary: new Date(2024, 3, 1), secondary: 18 },
          { primary: new Date(2024, 4, 1), secondary: 25 },
          { primary: new Date(2024, 5, 1), secondary: 22 },
          { primary: new Date(2024, 6, 1), secondary: 20 },
          { primary: new Date(2024, 7, 1), secondary: 18 },
          { primary: new Date(2024, 8, 1), secondary: 26 },
          { primary: new Date(2024, 9, 1), secondary: 28 },
          { primary: new Date(2024, 10, 1), secondary: 29 },
          { primary: new Date(2024, 11, 1), secondary: 23 },
        ],
      },
      {
        label: 'Serie 2',
        data: [
          { primary: new Date(2024, 0, 1), secondary: 20 },
          { primary: new Date(2024, 1, 1), secondary: 25 },
          { primary: new Date(2024, 2, 1), secondary: 30 },
          { primary: new Date(2024, 3, 1), secondary: 27 },
          { primary: new Date(2024, 4, 1), secondary: 23 },
          { primary: new Date(2024, 5, 1), secondary: 25 },
          { primary: new Date(2024, 6, 1), secondary: 24 },
          { primary: new Date(2024, 7, 1), secondary: 19 },
          { primary: new Date(2024, 8, 1), secondary: 17 },
          { primary: new Date(2024, 9, 1), secondary: 14 },
          { primary: new Date(2024, 10, 1), secondary: 11 },
          { primary: new Date(2024, 11, 1), secondary: 15 },
        ],
      },
    ],
    []
  );

  // Definimos los ejes, aplicando el tipado adecuado
  const primaryAxis = useMemo<AxisOptions<Datum>>(
    () => ({
      getValue: (datum: Datum) => datum.primary, // Tipo correcto para datum
      scaleType: 'time',
    }),
    []
  );

  const secondaryAxes = useMemo<AxisOptions<Datum>[]>(
    () => [
      {
        getValue: (datum: Datum) => datum.secondary, // Tipo correcto para datum
        elementType: 'line',
      },
    ],
    []
  );

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Chart<Datum>
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
};

export default LineChart;
