'use client'
import momentTZ from 'moment-timezone';
import React from "react";
import { RegistroFecha } from "../../models/registro.fecha";
import { RegistroCotizacion } from "../../models/registro.cotizacion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TIMEZONE: string = 'Asia/Tokyo';

const MESES = [
  'Enero', 'Febrero'
]

function getDaysInMonth(month: any, year: any) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const HORAS_DIA = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

export default function Home() {

  function getFechaFromRegistroFecha(fecha: RegistroFecha): Date {
    const horaTz = momentTZ.tz(
      `${fecha.fecha}`,
      TIMEZONE,
    );
    return horaTz.toDate();
  }

  function getRegistroFechaFromFecha(fecha: Date): RegistroFecha {
    const fechaStr = momentTZ(fecha).tz(TIMEZONE).format();
    return {
      fecha: fechaStr.substring(0, 10),
      hora: fechaStr.substring(11, 16),
    };
  }

  function agregarUnaHora(fecha: Date): Date {
    const currentMils = fecha.getTime();
    const tuki = currentMils + 1000 * 60 * 60;
    console.log(tuki + '80');
    console.log(currentMils + '81');
    
    return new Date(tuki);
  }

  const rotateArrayToFirstIndex = (arr: any[], indexToPlaceFirst: number) => {
    if (indexToPlaceFirst < 0 || indexToPlaceFirst >= arr.length) {
      console.log('Invalid index.');
      return arr;
    }
    const rotatedArray = [];
    const { length } = arr;
    for (let i = indexToPlaceFirst; i < length + indexToPlaceFirst; i += 1) {
      const originalIndex = i % length;
      rotatedArray.push(arr[originalIndex]);
    }

    return rotatedArray;
  };

  function estaEntreLasHoras(
    registro: any,
    horaDesde: string,
    horaHasta: string,
  ): boolean {
    let horasCinta = rotateArrayToFirstIndex(
      HORAS_DIA,
      HORAS_DIA.findIndex((hora) => hora == horaDesde),
    );
    const indiceHasta = horasCinta.findIndex((hora) => hora == horaHasta);
    horasCinta = horasCinta.slice(0, indiceHasta + 1);

    return horasCinta.findIndex((horac) => horac == registro.hora) >= 0;
  }

  function getRegistrosEntreFechas(
    fechaDesde: RegistroFecha,
    fechaHasta: RegistroFecha,
    horarios?: {
      horaDesde: string;
      horaHasta: string;
    },
  ): any[] {
    const registros = [];
    let fechaActual = fechaDesde;
    const fechaLimite = fechaHasta;
    console.log(fechaActual + '127');
    console.log(fechaLimite + '128');
    
    
    while (fechaActual <= fechaLimite) {
      const registro = fechaActual;
      console.log(fechaActual.hora + '133'); 
      const modificarFecha = agregarUnaHora(getFechaFromRegistroFecha(fechaActual));
      console.log(fechaActual.hora + '134');     
      fechaActual = getRegistroFechaFromFecha(modificarFecha);
      console.log(fechaActual.hora + '136');
      registros.push({
        name: registro,
        Amazon: Math.random() * 1000,
        Tesla: Math.random() * 1000,
        Pepsi: Math.random() * 1000,
        Nestle: Math.random() * 1000,
      })
    }
    if (horarios) {
      return registros.filter((registro) => {    
        estaEntreLasHoras(
          registro,
          horarios.horaDesde,
          horarios.horaHasta,
        );
      },
      );
    }
    return registros;
  }
  const dia = 24 * 60 * 60 * 1000;
  const hoy = new Date();
  const fecha = new Date()
  const mañana = new Date(fecha.setDate(fecha.getDate() + 1));
  const hoyRF = getRegistroFechaFromFecha(hoy);
  const mañanaRF = getRegistroFechaFromFecha(mañana);
  const horarios = { horaDesde: '09:00', horaHasta: '15:00'};

  const data = getRegistrosEntreFechas(hoyRF, mañanaRF, horarios);
  
  
  /* const data = [
    {
      name: "9:00",
      Amazon: 4000,
      Tesla: 2400,
      Pepsi: 2400,
      Nestle: 2100,
    },
    {
      name: "10:00",
      Amazon: 3000,
      Tesla: 1398,
      Pepsi: 2210,
      Nestle: 5633,
    },
    {
      name: "11:00",
      Amazon: 2000,
      Tesla: 9800,
      Pepsi: 2290,
      Nestle: 4856,
    },
    {
      name: "12:00",
      Amazon: 2780,
      Tesla: 3908,
      Pepsi: 2000,
      Nestle: 3450,
    },
    {
      name: "13:00",
      Amazon: 1890,
      Tesla: 4800,
      Pepsi: 2181,
      Nestle: 2100,
    },
    {
      name: "14:00",
      Amazon: 2390,
      Tesla: 3800,
      Pepsi: 2500,
      Nestle: 2100,
    },
    {
      name: "15:00",
      Amazon: 3490,
      Tesla: 4300,
      Pepsi: 2100,
      Nestle: 3000,
    },
  ]; */
  /* const data_mes = getRegistrosEntreFechas(); */

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Amazon"
        stroke="#d9430d"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Tesla" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Pepsi" stroke="#1224c7" />
      <Line type="monotone" dataKey="Nestle" stroke="#285fd4" />
    </LineChart>
  );
}