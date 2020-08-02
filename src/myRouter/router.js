/*
 * @Author: sundada
 * @Date: 2020-08-02 15:15:06
 * @Last Modified by: sundada
 * @Last Modified time: 2020-08-02 19:41:36
 */
/* eslint-disable */
let Svue
class VueRouter {
  constructor(options) {
    // Svue
    this.$options = options
    // this.current = new Svue({
    //   data () {
    //     return {
    //       url: window.location.hash.slice(1) || '/'
    //     }
    //   }
    // })
    const inital = window.location.hash.slice(1) || '/'
    Svue.util.defineReactive(this, 'current', inital)
    this.routerMap = {}
    this.$options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
    window.addEventListener('hashchange', this.hashchange.bind(this))
    window.addEventListener('load', this.hashchange.bind(this))
  }
  hashchange () {
    this.current = window.location.hash.slice(1)
    // this.current.url = window.location.hash.slice(1)
  }
}
VueRouter.install = function (Vue) {
  Svue = Vue
  Vue.mixin({
    created () {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render (h) {
      return h('a', {
        attrs: {
          href: '/#' + this.to
        }
      }, this.$slots.default)
    }
  })
  Vue.component('router-view', {
    render (h) {
      // const routes = this.$router.$options.routes
      // const comp = routes.find(route => route.path === this.$router.current.url).component
      const { current, routerMap } = this.$router
      console.log('render')
      // const comp = routerMap[current.url] ? routerMap[current.url].component : null
      const comp = routerMap[current] ? routerMap[current].component : null
      return h(comp)
    }
  })
}
export default VueRouter
