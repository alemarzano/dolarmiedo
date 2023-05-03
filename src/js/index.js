// Almacenamos los valores de compra y venta en variables globales
const compraDolarBlue = null;
const ventaDolarBlue = null;

const billetesNacionales = [
  { nombre: 'Hornero', pesos: 1000 },
  { nombre: 'Yaguareté', pesos: 500 },
  { nombre: 'Ballena FA', pesos: 200 },
  { nombre: 'El Cóndor de los Andes', pesos: 50 },
  { nombre: 'Guanaco', pesos: 20 },
];

const coinQuotes = {};
async function getDolarQuote() {
  let dolarBlue = null;
  try {
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
    const data = await response.json();
    Object.keys(data).forEach((key) => {
      if (key !== 'last_update') {
        coinQuotes[key] = data[key];
      } else {
        coinQuotes.last_update = data.last_update;
      }
    });
    dolarBlue = data.blue.value_sell;
  } catch (error) {
    console.error('Error al obtener la cotización del dolar blue:', error);
  }
  return dolarBlue;
}
// Hacemos una copia del array original
async function copiaMonedasNacionales() {
  const cotizacion = await getDolarQuote();
  return [...billetesNacionales, { nombre: 'Dolar Blue', pesos: cotizacion }];
}

async function buildPositionsTable() {
  const copiaConDolarBlue = await copiaMonedasNacionales();
  copiaConDolarBlue.sort((a, b) => b.pesos - a.pesos);
}

function mostrarHora() {
  // Obtenemos la hora actual
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();

  // Formateamos la hora para que tenga dos dígitos siempre
  const horaFormateada = hora < 10 ? `0${hora}` : hora;
  const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

  // Devolvemos la hora formateada
  return `${horaFormateada}:${minutosFormateados}`;
}

// Hacer que getDolarQuote() retorne el valor dolarBlue para asignarlo en un array

function buildScores() {
  const scoreCointaner = document.querySelector('.score__cotizacion');

  Object.entries(coinQuotes).forEach(([bill, info]) => {
    if (bill === 'oficial' || bill === 'blue') {
      const billScore = `
      <table cellspacing="0">
        <tbody>
          <tr class="score__cotizacion--header">
            <td colspan="6">
              <div>
                <img src="" />
                <span>DOLAR ${bill}</span>
                <img src="" />
              </div>
            </td>
          </tr>
          <tr>
            <td class="score__cotizacion--time" id="scoreTime">
              <span></span>
              <img src="img/ar.png" alt="" />
            </td>
            <td class="score__cotizacion--operation">
              <img src="img/comprar.svg" /><br /><span>Compra</span>
            </td>
            <td class="score__cotizacion--result">
              <div class="rojas1" id="roj1_1_196"></div>
              <span id="compra">${info.value_buy}</span>
            </td>
            <td class="score__cotizacion--result">
              <span id="venta">${info.value_sell}</span>
              <div class="rojas2" id="roj2_1_196"></div>
            </td>
            <td class="score__cotizacion--operation">
              <img src="img/vender.svg" /><br /><span>Venta</span>
            </td>
            <td class="game-info" id="for_1_196"></td>
          </tr>
          <tr class="score__cotizacion--lastUpdated">
            <td colspan="6" id="g2_1_196">
              <span id="timeUpdated"></span>
              Última actualización
            </td>
          </tr>
        </tbody>
      </table>
    `;
      scoreCointaner.innerHTML += billScore;
    }
  });
}

function reload() {
  // Obtenemos la hora actual
  const horaActual = new Date().getHours();
  const score = document.querySelector('#scoreTime');
  const scoreTime = score.children[0];

  // Si la hora está entre las 9am y las 3pm, ejecutamos las funciones
  if (horaActual >= 9 && horaActual < 17) {
    score.classList.remove('final');
    score.classList.add('active');
    scoreTime.textContent = mostrarHora();
    // Actualizar dolar
    getDolarQuote();
  } else if (horaActual >= 15 && horaActual < 24) {
    score.classList.remove('active');
    score.classList.add('final');
    scoreTime.textContent = 'Final';
    getDolarQuote();
    // Mostramos los valores almacenados previamente
    const divCompra = document.querySelector('#compra');
    const divVenta = document.querySelector('#venta');
    divCompra.textContent = compraDolarBlue;
    divVenta.textContent = ventaDolarBlue;
  } else if (horaActual >= 0 && horaActual < 9) {
    scoreTime.textContent = '9:00';
    // Mostramos los valores almacenados previamente
    const divCompra = document.querySelector('#compra');
    const divVenta = document.querySelector('#venta');
    divCompra.textContent = compraDolarBlue;
    divVenta.textContent = ventaDolarBlue;
  }
}
// Llamamos a la función cada minuto utilizando setInterval
document.addEventListener('DOMContentLoaded', async () => {
  // Ejecutamos nuestra función aquí
  await buildPositionsTable();
  // buildScores();
  // reload();
  setInterval(reload, 60000);
});
