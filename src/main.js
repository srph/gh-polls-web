// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'normalize.css';

import Icon from 'vue-awesome';
import 'vue-awesome/icons/remove'
import 'vue-awesome/icons/ellipsis-v'
Vue.component('icon', Icon);

import axios from 'axios';
import config from './config';
axios.defaults.baseURL = config.api;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
