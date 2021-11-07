import Vue from 'vue'
import App from './pull-refresh/index.vue'
// import App from './packages/App.vue'
// import App from './App.vue'
// import router from './myRouter1'
// import router from './Router1'
import router from './sundadaRouter'
// import router from './myRouter'
// import store from './Mystore3'
// import store from './StoreFinal'
// import store from './Mystore2'
import store from './Mystore'
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
// import store from './store'
// import router from './router'
const useTest = {
  install (Vue) {
    // console.dir(Vue.util.defineReactiv)
    const obj = {}
    Vue.util.defineReactive(obj, '_test', 111)
    Vue.prototype.$obj = obj
  }
}
Vue.use(useTest)
Vue.config.productionTip = false

console.log('Vue.options', Vue.options)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
