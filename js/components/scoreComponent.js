export default {
  template: `<div class="score__cotizacion">
  <table cellspacing="0">
    <tbody>
      <tr class="score__cotizacion--header">
        <td colspan="6">
          <div>
            <img :src="'img/dolar_' + icon + '.svg'" />
            <span>DOLAR {{title}}</span>
            <img :src="'img/dolar_' + icon + '.svg'" />
          </div>
        </td>
      </tr>
      <tr>
        <td class="score__cotizacion--time" :class="{  active: esHoraActiva, final: !esHoraActiva }">
        <span>{{mostrarHora()}}</span>
        <img v-if="esHoraActiva" src="img/ar.png" alt="" />
        </td>
        <td class="score__cotizacion--operation">
          <img src="img/comprar.svg" /><br /><span>Compra</span>
        </td>
        <td class="score__cotizacion--result">
          <div class="rojas1" id="roj1_1_196"></div>
          <span > {{ buy }} </span>
        </td>
        <td class="score__cotizacion--result">
          <span> {{ sell }} </span>
          <div class="rojas2" id="roj2_1_196"></div>
        </td>
        <td class="score__cotizacion--operation">
          <img src="img/vender.svg" /><br /><span>Venta</span>
        </td>
        <td class="game-info" id="for_1_196"></td>
      </tr>
      <tr class="score__cotizacion--lastUpdated">
        <td colspan="6" id="g2_1_196">
          <span id="timeUpdated">{{ formatDate(updated) }}</span>
          Última actualización
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
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

      if (hour >= 9 && hour <= 18) {
        updated = `${hour}:${date.getMinutes()}`;
      } else if (hour > 18) {
        updated = `18:00`;
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
        hora <= 18 &&
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
