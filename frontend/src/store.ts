import Vue from 'vue';
import Vuex from 'vuex';
import app from './vuex/app';
import auth from './vuex/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { app, auth }
});
