

interface Datum {
  primary: Date;
  secondary: number;
}

//Genera horas
export function generarFechasCadaHora(fechaInicial: Date): Datum[] {
  const data: Datum[] = [];
  const horasEnUnAño = 24 * 365;
  // Valor inicial
  let valorAccion = 10;

  for (let i = 0; i < horasEnUnAño; i++) {
      const nuevaFecha = new Date(fechaInicial.getTime() + i * 60 * 60 * 1000);
      valorAccion = generarNumeroConVariacion(valorAccion);
      const dataJSON = {
          primary: nuevaFecha,
          secondary: valorAccion,
      };
      data.push(dataJSON);
  }
  return data;
}


// function filtrarDatosPorHora(datos: any[]): any[] {
//   return datos.filter((dato) => {
//     const hora = new Date(dato.primary).getUTCHours(); // Obtiene la hora en formato UTC
//     return hora >= 9 && hora <= 15; // Solo horarios entre 09:00 y 15:00
//   });
// }

//Genera numeros random

function generarNumeroConVariacion(anterior: number): number {
  const variacion = Math.floor(Math.random() * 5) - 2;
  return anterior + variacion;
  }











//  const generateNextStockPrice = () => {
//      let variation = Math.random() * 2 - 1;
//      if (Math.random() * this.stabilityFactor < 0.02) {
//         // como maximo un 2% de posibilidades de un variacion importante
//        variation *= 10;
//      }
//      if (this.history.length < 10) {
//        return Math.abs(this.currentPrice + variation);
//      } else {
//        variation = Math.abs(variation);
//        if (Math.random() < 0.1) {
//          return Math.abs(this.currentPrice + variation * this.tendency());
//        } else {
//          return Math.abs(this.currentPrice);
//        }
//      }
//    };
