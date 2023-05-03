export default {
  template: `<div class="score flex column mb-3">
                <div class="score__header bg-green flex axis-center pt-1 pb-1">
                  <img :src="'img/dolar_' + icon + '.svg'" />
                  <span class="ml-1 mr-1 text-white uppercase">DOLAR {{title}}</span>
                  <img :src="'img/dolar_' + icon + '.svg'" />
                </div>
                <div class="score__data">
                  <div class="flex axis-center wrap pb-3 pt-3" :class="{  'bg-red': esHoraActiva, 'bg-grey-dark': !esHoraActiva }">
                    <span class="text-white text-md mr-1">{{mostrarHora()}}</span>
                    <img v-if="esHoraActiva" src="img/ar.png" alt="" />
                  </div>
                  <div class="flex column axis-center bg-grey-light pt-1">
                    <img src="/img/comprar.svg" alt="" />
                    <span class="text-md bold">Compra</span>
                  </div>
                  <div class="flex axis-center bg-white">
                    <span class="bold">{{ buy }}</span>
                  </div>
                  <div class="flex axis-center bg-white">
                    <span class="bold">{{ sell }}</span>
                  </div>
                  <div class="flex column axis-center bg-grey-light pt-1">
                    <img src="/img/vender.svg" alt="" />
                    <span class="text-md bold">Venta</span>
                  </div>
                  <div class="bg-green-light flex axis-center">
                    <span class="text-md text-white"></span>
                  </div>
                </div>
                <div class="flex axis-center bg-white score__updated">
                  <p class="mb-0 mt-0 light text-md pt-1 pb-1">
                    <span class="text-red mr-1 bold">{{ formatDate(updated) }}</span>Última actualización
                  </p>
                </div>
              </div>`,
  props: ['title', 'icon', 'buy', 'sell', 'updated', 'coinQuote'],
  data() {
    return {
      esHoraActiva: false,
      horaFormateada: '',
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const dayOfWeek = date.getDay();
      const hour = date.getHours();
      let updated = '';
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        updated = `Viernes`;
      }

      if (hour >= 9 && hour < 18) {
        updated = `${hour}:${date.getMinutes()}`;
      } else if (hour >= 18) {
        updated = '18:00';
      }
      return updated;
    },
    mostrarHora() {
      // Obtenemos la hora actual
      const fechaActual = new Date();
      const hora = fechaActual.getHours();
      const minutos = fechaActual.getMinutes();
      const horaFormateada = hora < 10 ? `0${hora}` : hora;
      const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

      if (
        hora >= 9 &&
        hora < 18 &&
        fechaActual.getDay() >= 1 &&
        fechaActual.getDay() <= 5
      ) {
        this.esHoraActiva = true;
      } else {
        this.esHoraActiva = false;
      }
      return this.esHoraActiva
        ? `${horaFormateada}:${minutosFormateados}`
        : 'Final';
    },
  },
  mounted() {
    this.mostrarHora();
    setInterval(() => {
      this.mostrarHora();
    }, 60000);
  },
};
