// eslint-disable-next-line import/no-unresolved
import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

import ScoreComponent from './components/scoreComponent.js';
import { getDolarQuote, coinQuotes } from './components/api.js';

createApp({
  components: {
    score: ScoreComponent,
  },
  data() {
    return {
      coinQuotes: {},
    };
  },
  mounted() {
    getDolarQuote().then(() => {
      this.coinQuotes = coinQuotes;
    });
  },
}).mount('#app');
