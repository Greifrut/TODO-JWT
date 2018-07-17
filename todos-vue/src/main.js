// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */ t
import Vue from 'vue'
import App from './App'
import router from './router'
import  VueAxios from 'vue-axios'
import { secureAxiosInstance, plainAxiosInstance } from './backend/axios'

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: secureAxiosInstance,
  plain: plainAxiosInstance
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  secureAxiosInstance,
  plainAxiosInsrance,
  components: { App },
  template: '<App/>'
})
