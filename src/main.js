import Vue from 'vue'
import App from './App.vue'
import router from './myRouter'
console.log('222222222')
// import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
