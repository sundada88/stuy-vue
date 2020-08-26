
/* eslint-disable */
let vue
class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
    // vue.util.defineReactive(this, 'current', intial)
    vue.util.defineReactive(this, 'matched', [])
    this.initMatched()
    this.init()
    this.routerMap = this.initRouterMap()
  }
  init () {
    window.addEventListener('load', this.handleHashChange.bind(this))
    window.addEventListener('hashchange', this.handleHashChange.bind(this))
  }
  initMatched (routes) {
    routes = routes || this.$options.routes
    for (const route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.initMatched(route.children)
        }
        return
      }
    }
  }
  handleHashChange () {
    window.location.hash = window.location.hash.slice(1) || '/'
    this.current = window.location.hash.slice(1) || '/#'
    this.matched = []
    this.initMatched()
  }
  initRouterMap () {
    return this.$options.routes.reduce((prev, curre) => {
      console.log(curre)
      prev[curre.path] = curre.component
      return prev
    }, {})
  }
}
VueRouter.install = function (Vue) {
  vue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.router) {
        // Vue.prototype.$router = this.$options.router
        this._root = this
        this._router = this.$options.router
      } else {
        this._root = (this.$parent && this.$parent._root) || this
      }
      Object.defineProperty(this, '$router', {
        get () {
          return this._root._router
        }
      })
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
      this.$vnode.data.routerView = true
      let deepth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData && vnodeData.routerView) {
          deepth++
        }
        parent = parent.$parent
      }
      console.log(deepth)
      // const { current, routerMap } = this.$router
      // const comp = routerMap[current]
      let comp = null
      const route = this.$router.matched[deepth]
      console.log(route)
      if (route) {
        comp = route.component
      }
      return h(comp)
    }
  })
}
export default VueRouter
