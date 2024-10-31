"use client";

import { Chart, AxisOptions } from 'react-charts';
import { ReactElement, useMemo, useState } from 'react';


// Define la interfaz para los datos
interface Datum {
    primary: Date;
    secondary: number;
}

// Función para generar un número con variación
function generarNumeroConVariacion(valorActual: number): number {
    const variacion = (Math.random() - 0.5) * 2; // Variación entre -1 y 1
    return Math.max(0, valorActual + variacion); // Asegura que el valor no sea negativo
}

// Función para generar datos cada hora
export function generarFechasCadaHora(fechaInicial: Date): any[] {
    const data: any[] = [];
    const horasEnUnAño = 24 * 365;

    // Valor inicial
    let valorAccion = 10;

    for (let i = 0; i < horasEnUnAño; i++) {
        const nuevaFecha = new Date(fechaInicial.getTime() + i * 60 * 60 * 1000);
        valorAccion = generarNumeroConVariacion(valorAccion);

        const dataJSON = {
            primary: nuevaFecha, // Mantener como objeto Date
            secondary: valorAccion,
        };

        data.push(dataJSON);
    }
    console.log("data", data);
    return data;
}

// Función para filtrar datos por hora
function filtrarDatosPorHora(datos: any[]): any[] {
    return datos.filter((dato) => {
        const hora = new Date(dato.primary).getUTCHours(); // Obtiene la hora en formato UTC
        return hora >= 9 && hora <= 15; // Solo horarios entre 09:00 y 15:00
    });
}

const GraficoFechas = (): ReactElement => {
    const [view, setView] = useState<string>('day'); // Estado para la vista

    // Generación de datos para todo el año 2024
    const rawData = useMemo(() => {
        const startDate = new Date(2024, 0, 1); // 1 de enero de 2024
        const data = generarFechasCadaHora(startDate);
        return filtrarDatosPorHora(data); // Filtrar datos según la hora
    }, []);

// Función para transformar los datos según la vista seleccionada
const transformData = (view: string) => {
    const transformedData: Datum[] = [];
    if (view === 'day') {
        // Solo mostrar datos de un día específico (por ejemplo, el 1 de enero de 2024)
        const targetDate = new Date(2024, 0, 1); // Cambia la fecha según sea necesario
        const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));

        rawData.forEach(datum => {
            if (datum.primary >= startOfDay && datum.primary <= endOfDay) {
                transformedData.push({ primary: new Date(datum.primary), secondary: datum.secondary });
            }
        });

        // Asegurarnos de que se muestren 6 datos de 9 a 15 hs
        if (transformedData.length < 6) {
            console.error('No se encontraron 24 datos para el día seleccionado.');
        }
    } else if (view === 'month') {
        // Mostrar 1 dato por cada día del mes
        const dailyData: { [key: string]: { sum: number, count: number } } = {};
        const targetMonth = 0; // Enero (0-11)
        const targetYear = 2024;

        rawData.forEach(datum => {
            const dateKey = datum.primary.toISOString().split('T')[0]; // Formato YYYY-MM-DD
            const datumDate = new Date(dateKey);
            if (datumDate.getUTCMonth() === targetMonth && datumDate.getUTCFullYear() === targetYear) {
                if (!dailyData[dateKey]) {
                    dailyData[dateKey] = { sum: 0, count: 0 };
                }
                dailyData[dateKey].sum += datum.secondary;
                dailyData[dateKey].count++;
            }
        });

        Object.entries(dailyData).forEach(([dateKey, { sum, count }]) => {
            const avgSecondary = sum / count;
            transformedData.push({ primary: new Date(dateKey), secondary: avgSecondary });
        });

        // Asegurarse de que se muestren datos para todos los días del mes
        const totalDaysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate(); // Total de días en el mes
        if (transformedData.length < totalDaysInMonth) {
            console.error(`No se encontraron datos para todos los días del mes. Se encontraron ${transformedData.length} datos.`);
        }
    } else if (view === 'year') {
        // Mostrar 1 dato por mes
        const monthlyData: { [key: number]: { sum: number, count: number } } = {};
        const targetYear = 2024;

        rawData.forEach(datum => {
            const month = datum.primary.getUTCMonth(); // Obtiene el mes (0-11)
            const year = datum.primary.getUTCFullYear(); // Obtiene el año
            if (year === targetYear) {
                if (!monthlyData[month]) {
                    monthlyData[month] = { sum: 0, count: 0 };
                }
                monthlyData[month].sum += datum.secondary;
                monthlyData[month].count++;
            }
        });

        Object.entries(monthlyData).forEach(([monthStr, { sum, count }]) => {
            const avgSecondary = sum / count;
            const monthDate = new Date(targetYear, Number(monthStr), 1); // Primer día del mes
            transformedData.push({ primary: monthDate, secondary: avgSecondary });
        });

        // Asegurarse de que se muestren datos para todos los meses
        if (transformedData.length < 12) {
            console.error('No se encontraron datos para todos los meses.');
        }
    }
    return [{ label: 'Serie 1', data: transformedData }];
};

// Función para obtener el número de semana
function getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Función para obtener el primer día de la semana
function getWeekStartDate(weekNumber: number, year: number ): Date {
    const firstDayOfYear = new Date(year, 0, 1);
    const firstDayOfWeek = new Date(firstDayOfYear.getTime() + (weekNumber - 1) * 7 * 86400000);
    return firstDayOfWeek;
}



    // Datos transformados según la vista seleccionada
    const data = useMemo(() => transformData(view), [view]);

    // Definimos los ejes
    const primaryAxis = useMemo<AxisOptions<Datum>>(
        () => ({
            getValue: (datum: Datum) => datum.primary,
            scaleType: 'time',
        }),
        []
    );

    const secondaryAxes = useMemo<AxisOptions<Datum>[]>(
        () => [
            {
                getValue: (datum: Datum) => datum.secondary,
                elementType: 'line',
            },
        ],
        []
    );

    return (
        <div>
            <select
                onChange={(e) => setView(e.target.value)}
                value={view}
                style={{ marginBottom: '10px', padding: '5px' }}
            >
                <option value="day">Día</option>
                < option value="month">Mes</option>
                <option value="year">Año</option>
            </select>
            <div style={{ width: '1000px', height: '400px' }}>
            <Chart<Datum>
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                    }}/>
                    </div>
        </div>
    );
};

export default GraficoFechas;