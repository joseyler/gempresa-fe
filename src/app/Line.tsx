"use client";

import { Chart, AxisOptions } from 'react-charts';
import { ReactElement, useMemo, useState } from 'react';
import { generarFechasCadaHora } from './generador-datos';

// Define la interfaz para los datos
interface Datum {
    primary: Date;
    secondary: number;
}


const LineChart = (): ReactElement => {
    const [view, setView] = useState<string>('day'); 

    // Generación de datos aleatorios por hora para todo el año 2024
    const rawData = useMemo(() => generarFechasCadaHora(new Date(2024, 0, 1)), []);

    // Función para transformar los datos según la vista seleccionada
    const transformData = (view: string) => {
        const transformedData: Datum[] = [];

        if (view === 'day') {
            // Mostrar datos por horas del último día (esto ya está en rawData)
            const ultimoDia = rawData.slice(-24); // Últimas 24 horas
            transformedData.push(...ultimoDia);
        } else if (view === 'month') {
            // Mostrar datos por semanas
            for (let i = 0; i < rawData.length; i += 7 * 24) { // 7 días = 7 * 24 horas
                const weekData = rawData.slice(i, i + 7 * 24);
                const avgSecondary = weekData.reduce((sum, datum) => sum + datum.secondary, 0) / weekData.length;
                transformedData.push({
                    primary: weekData[0].primary, // Fecha de inicio de la semana
                    secondary: avgSecondary, // Promedio de la semana
                });
            }
        } else if (view === 'year') {
            // Mostrar datos por meses
            for (let month = 0; month < 12; month++) {
                const monthData = rawData.filter(datum => datum.primary.getMonth() === month);
                if (monthData.length > 0) {
                    const avgSecondary = monthData.reduce((sum, datum) => sum + datum.secondary, 0) / monthData.length;
                    transformedData.push({
                        primary: new Date(2024, month, 1), // Primera fecha del mes
                        secondary: avgSecondary, // Promedio del mes
                    });
                }
            }
        }

        return [{ label: 'Serie 1', data: transformedData }];
    };

    // Datos transformados según la vista seleccionada
    const data = useMemo(() => transformData(view), [view, rawData]);

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
                <option value="month">Mes</option>
                <option value="year">Año</option>
            </select>
            <div style={{ width: '600px', height: '500px' }}>
                <Chart<Datum>
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                    }}
                />
            </div>
        </div>
    );
};

export default LineChart;