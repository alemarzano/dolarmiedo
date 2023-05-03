import { coinQuotes } from './api.js';

const billetesNacionales = [
  { nombre: 'Hornero', pesos: 1000 },
  { nombre: 'Yaguareté', pesos: 500 },
  { nombre: 'Ballena FA', pesos: 200 },
  { nombre: 'El Cóndor de los Andes', pesos: 50 },
  { nombre: 'Guanaco', pesos: 20 },
  { nombre: 'Dolar Junior', pesos: null },
  { nombre: 'Dolar Blue', pesos: null },
];
export default {
  data() {
    return {
      billetes: billetesNacionales,
    };
  },
  props: ['index', 'nombre', 'pesos'],
  computed: {
    dolarJunior() {
      return this.$root.coinQuotes?.oficial?.value_sell ?? null;
    },
    dolarBlue() {
      return this.$root.coinQuotes?.blue?.value_sell ?? null;
    },
  },
  methods: {
    updateData() {
      this.billetes[5].pesos = this.dolarJunior;
      this.billetes[6].pesos = this.dolarBlue;
      this.billetes.sort((a, b) => {
        return b.pesos - a.pesos;
      });
    },
    getClassRow(index) {
      switch (index) {
        case 0:
          return 'bg-green-alert';
        default:
          return index % 2 === 0 ? 'bg-grey-light' : 'bg-grey-medium';
      }
    },
    getClassPosition(index) {
      switch (index) {
        case 0:
          return 'bg-green-disclaimer';
        case this.billetes.length - 2:
          return 'bg-yellow';
        case this.billetes.length - 1:
          return 'bg-alert text-white';
        default:
          return null;
      }
    },
    getImage(billete) {
      switch (billete.nombre) {
        case 'Dolar Junior':
          return 'img/oficial.jpg';
        case 'Dolar Blue':
          return 'img/blue.jpg';
        default:
          return `img/${billete.pesos}.jpg`;
      }
    },
  },
  watch: {
    '$root.coinQuotes': {
      handler: 'updateData',
      immediate: true,
    },
  },
  template: `
    <table id="positions" class="positions__table">
      <thead class="bg-black">
        <tr class="text-white bg-green-medium">
          <th colspan="3"><p class="m-0 pt-1 pb-1">Tabla Puntos</p></th>
        </tr>
      </thead>
      <thead class="bg-grey-normal">
        <tr class="text-white bg-black">
          <th>#</th>
          <th>Billetes</th>
          <th>Pesos</th>
        </tr>
      </thead>
      <tbody class="bg-grey-normal">
        <tr v-for="(billete, index) in billetes" :key="index" :class="getClassRow(index)">
          <td class="pr-1 pl-1" align="center" :class="getClassPosition(index)">{{index + 1}}</td>
          <td align="left" >
          <div class="flex align-center bold pt-1 pb-1">
          <img :src="getImage(billete)" class="mr-2 ml-2"/>{{billete.nombre}}</div>
          </td>
          <td align="center">{{billete.pesos}}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr class="bg-green-disclaimer text-md">
        <td colspan="3">
        <p class="mb-0 mt-0 ml-3">Puestos de convertibilidad</p> 
        </td>
        </tr>
        <tr class="bg-yellow text-md">
        <td colspan="3">
        <p class="mb-0 mt-0 ml-3 bold">Jugará la promoción</p> 
        </td>
        </tr>
        <tr class="bg-alert text-white text-md"> <td colspan="3"><p class="mb-0 mt-0 ml-3 bold">El último desciende a moneda metálica</p></td></tr>
      </tfoot>
    </table>
  `,
};
