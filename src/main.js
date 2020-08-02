import Vue from 'vue'
import App from './App.vue'
import router from './myRouter'
console.log('1111111111111')
// import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
