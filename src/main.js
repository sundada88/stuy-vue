import Vue from 'vue'
import App from './App.vue'
import router from './myRouter'
import store from './Mystore'
// import store from './store'
// import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
