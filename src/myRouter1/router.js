/*
 * @Author: sundada
 * @Date: 2020-08-02 15:15:06
 * @Last Modified by: sundada
 * @Last Modified time: 2020-08-04 11:42:50
 */
/* eslint-disable */
class HistoryRouter {
  constructor() {
    this.current = ''
  }
}
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.history = new HistoryRouter()
    this.routerMap = this.initRouterMap(options.routes)
    this.init(options.routes)
  }
  init () {
    if (this.mode === 'hash') {
      window.location.hash ? '' : window.location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = window.location.hash.slice(1) || '/'
        console.log(this.history.current)
      })
      window.addEventListener('hashchange', () => {
        this.history.current = window.location.hash.slice(1) || '/'
        console.log(this.history.current)
      })
    }
  }
  initRouterMap (routes) {
    return routes.reduce((prev, current) => {
      prev[current.path] = current.component
      return prev
    }, {})
  }
}
VueRouter.install = function (vue) {
  if (VueRouter.install.installed) return
  VueRouter.install.installed = true
  vue.mixin({
    beforeCreate () {
      // console.log(this.$options)
      if (this.$options && this.$options.router) {
        this._root = this
        this._router = this.$options.router
        vue.util.defineReactive(this, 'current', this._router.history)
      } else {
        this._root = (this.$parent && this.$parent._root) || this
      }
      Object.defineProperty(this, '$router', {
        get () {
          return this._root._router
        }
      })
      Object.defineProperty(this, '$route', {
        get () {
          return this._root.current.current
        }
      })
    }
  })
  vue.component('router-view', {
    render (h) {
      // const { current } = this._root._router.history
      // const current = this._root.current
      const { current } = this._root.current
      const { routerMap } = this._root._router
      return h(routerMap[current])
    }
  })
  vue.component('router-link', {
    render (h) {
      return h('a', 'link')
    }
  })
}
export default VueRouter
