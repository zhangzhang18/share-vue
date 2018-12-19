import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.headers.post['Content-Type'] = 'application/json'

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
// eslint-disable-next-line
/* eslint-disable */
console.log(router);