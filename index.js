// Almacenamos los valores de compra y venta en variables globales
let compraDolarBlue = null;
let ventaDolarBlue = null;

function mostrarHora() {
  // Obtenemos la hora actual
  const fechaActual = new Date();
  const hora = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  const segundos = fechaActual.getSeconds();

  // Formateamos la hora para que tenga dos dígitos siempre
  const horaFormateada = hora < 10 ? '0' + hora : hora;
  const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;

  // Devolvemos la hora formateada
  return horaFormateada + ':' + minutosFormateados;
}

function getDolarQuote() {
  fetch('https://api.bluelytics.com.ar/v2/latest')
    .then((response) => response.json())
    .then((data) => {
      const dolarBlue = data.blue;
      const lastUpdate = data.last_update;
      const divCompra = document.querySelector('#compra');
      const divVenta = document.querySelector('#venta');
      const divUpdated = document.querySelector('#timeUpdated');
      divCompra.textContent = dolarBlue.value_buy;
      divVenta.textContent = dolarBlue.value_sell;
      const updateFormated = new Date(lastUpdate).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      divUpdated.innerHTML = updateFormated;
      console.log(dolarBlue);
    })
    .catch((error) => {
      console.error('Error al obtener la cotización del dolar blue:', error);
    });
}

function reload() {
  // Obtenemos la hora actual
  const horaActual = new Date().getHours();
  const score = document.querySelector('#scoreTime');

  const scoreTime = score.children[0];

  // Si la hora está entre las 9am y las 3pm, ejecutamos las funciones
  if (horaActual >= 9 && horaActual < 15) {
    score.classList.remove('final');
    score.classList.add('active');
    scoreTime.textContent = mostrarHora();
    //Actualizar dolar
    getDolarQuote();
  } else if (horaActual >= 15 && horaActual < 24) {
    score.classList.remove('active');
    score.classList.add('final');
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
document.addEventListener('DOMContentLoaded', function () {
  // Ejecutamos nuestra función aquí
  getDolarQuote();
  reload();
  setInterval(reload, 60000);
});
