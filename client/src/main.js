import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

const newApp = new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
