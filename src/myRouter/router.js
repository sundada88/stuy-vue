/* eslint-disable */
let Svue
class VueRouter {
  constructor(options) {
    // Svue
    this.$options = options
    this.current = new Svue({
      data () {
        return {
          url: window.location.hash.slice(1) || '/'
        }
      }
    })
    window.addEventListener('hashchange', this.hashchange.bind(this))
  }
  hashchange () {
    this.current.url = window.location.hash.slice(1)
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
      const routes = this.$router.$options.routes
      const comp = routes.find(route => route.path === this.$router.current.url).component
      return h(comp)
    }
  })
}
export default VueRouter
