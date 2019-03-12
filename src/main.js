import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Admin from './layouts/Admin'
import Default from './layouts/Default'
import ApiService from './services/api.service'
import { TokenService } from './services/storage.service'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.component('default-layout', Default)
Vue.component('admin-layout', Admin)
Vue.config.productionTip = false

ApiService.init(process.env.VUE_APP_BASE_API)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

axios.interceptors.request.use(function (config) {
  console.log('Request Interceptor', config)
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  console.log('Response Interceptor', response)
  return response
}, function (error) {
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
