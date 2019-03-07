// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import store from './store'


Vue.prototype.moment = moment
Vue.use(Vuetify)
Vue.use(VeeValidate)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://service.inventry.test/api' //laravel service API base URL
window.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
    }
  },

  router,
  store,
  components: { App},
  template: '<App/>'
})

