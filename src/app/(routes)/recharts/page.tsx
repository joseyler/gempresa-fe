/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import momentTZ from 'moment-timezone';
import React,  {useEffect, useState } from "react";
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
import DateMomentUtils from '@/app/utils/DateMomentUtils';

const TIMEZONE: string = 'Asia/Tokyo';

const MESES = [
  'Enero', 'Febrero'
]



export default function Home() {

  const getValueFromReg = (reg: any) => {
    const cotEnv = reg.cotizaciones.filter((cot: any) => cot.empresa === 'NVIDIA');
      if (cotEnv) {
        return {
          valorAccion: cotEnv.valorAccion,
          fecha: reg.fecha + ' ' + reg.hora,
        };
      }
      return {
        valorAccion: null,
        fecha: reg.fecha + ' ' + reg.hora,
      };
  }

  const [registros] = useState(DateMomentUtils.getRegistrosEntreFechas(
    { fecha: '2024-10-01', hora: '00:00' },
    { fecha: '2024-10-02', hora: '15:00' },
  ));
  const [registrosNvidia, setRegistrosNvidia] = useState<any>([]);

  useEffect(() => {
    const nnva = registros.map((reg) => getValueFromReg(reg));
    setRegistrosNvidia(nnva);
  }, [registros]);


  return (
    <LineChart width={500} height={300} data={registros}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="fecha" padding={{ left: 30, right: 30 }} />
      <YAxis dataKey="valorAccion"/>
      <Tooltip />
      <Legend />
    </LineChart>
  );
}