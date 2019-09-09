import '@babel/polyfill';
import 'mutationobserver-shim';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import { createRouter } from './router';
import store from './store';
import BootsrapVue from 'bootstrap-vue';
import VueKuzzle from 'vue-kuzzle';
import config from './config.json';
import i18n from './i18n';
import './logger';

Vue.config.productionTip = false;

Vue.use(BootsrapVue);
Vue.use(VueKuzzle, config);

const router = createRouter(Vue.prototype.$kuzzle, store);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
