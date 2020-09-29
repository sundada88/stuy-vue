/*
 * @Author: sundada
 * @Date: 2020-08-02 15:15:06
 * @Last Modified by: sundada
 * @Last Modified time: 2020-09-29 17:34:54
 */
/* eslint-disable */
let Svue
class VueRouter {
  constructor(options) {
    this.$options = options
    this.current = window.location.hash.slice(1) || '/'
    // 定义路由数组
    Svue.util.defineReactive(this, 'matched', [])
    this.match()
    window.addEventListener('hashchange', this.hashchange.bind(this))
    window.addEventListener('load', this.hashchange.bind(this))
  }
  hashchange () {
    window.location.hash = window.location.hash ? window.location.hash.slice(1) : '/'
    this.current = window.location.hash.slice(1) || '/#'
    this.matched = []
    this.match()
  }
  match (routes) {
    routes = routes || this.$options.routes
    for (let route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        if (route.children) {
          this.match(route.children)
        }
        return
      }
    }
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
      // 标记当前router-view深度
      this.$vnode.data.routerView = true
      let depth = 0
      let parent = this.$parent
      while (parent) {

        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData && vnodeData.routerView) {
          // 说明当前parent是一个router-view 
          depth++
        }
        parent = parent.$parent
      }
      let comp = null
      const route = this.$router.matched[depth]
      if (route) {
        comp = route.component
      }
      return h(comp)
    }
  })
}
export default VueRouter
