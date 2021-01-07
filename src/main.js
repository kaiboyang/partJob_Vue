import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/ant-design-vue.js'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081/'
axios.defaults.timeout = 5000

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
