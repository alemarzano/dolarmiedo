// eslint-disable-next-line import/no-unresolved
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import ScoreComponent from './components/scoreComponent.js';
import PositionsComponent from './components/positionsComponent.js';
import { getDolarQuote, coinQuotes } from './components/api.js';

createApp({
  components: {
    score: ScoreComponent,
    position: PositionsComponent,
  },
  data() {
    return {
      coinQuotes: {},
      loaded: false,
    };
  },
  mounted() {
    getDolarQuote().then(() => {
      this.coinQuotes = coinQuotes;
      this.loaded = true;
    });
  },
}).mount('#app');
