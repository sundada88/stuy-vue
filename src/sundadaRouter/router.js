/* eslint-disable */
let Svue

class Router {
  constructor(options) {
    this.$options = options
    this.$routerMap = {}
    let intial = window.location.hash ? window.location.hash.slice(1) : '/'
    Svue.util.defineReactive(this, 'current', intial)
    Svue.util.defineReactive(this, 'matched', [])
    this.initMatch()
    // 初始化事件监听
    this.initEventListener()
    // 初始化路由表
    this.initRouterMap()
  }
  initEventListener () {
    window.addEventListener('hashchange', this.hashChange.bind(this))
    window.addEventListener('load', this.hashChange.bind(this))
  }
  hashChange () {
    window.location.hash = window.location.hash ? window.location.hash.slice(1) : '#/'
    this.current = window.location.hash.slice(1)
    this.matched = []
    this.initMatch()
  }
  initRouterMap () {
    this.$options.routes.forEach(route => {
      this.$routerMap[route.path] = route.component
    })
  }
  // 每次路由变化的时候都要执行一遍，动态改变matched中的内容
  initMatch (routes) {
    routes = routes || this.$options.routes
    for (let route of routes) {
      if (route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
      if (route.path !== '/' && this.current.indexOf(route.path) !== -1) {
        this.matched.push(route)
        route.children && this.initMatch(route.children)
        return
      }
    }
  }
}
Router.install = function (Vue) {
  Svue = Vue
  Vue.mixin({
    // 使得每个Vue实例都可以访问到$router属性
    beforeCreate () {
      // 这是将$router的属性挂载到Vue的实例上面
      // if (this.$options && this.$options.router) {
      //   Vue.prototype.$router = this.$options.router
      // }
      if (this.$options && this.$options.router) {
        this._root = this
        this._root._router = this.$options.router
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
  // 全局注册router-link组件
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
          href: '#' + this.to
        }
      }, this.$slots.default)
    }
  })
  // 全局注册router-view组件
  Vue.component('router-view', {
    render (h) {
      // 标记当前是否是router-view
      this.$vnode.data.routerView = true
      // 标记当前router-view的嵌套层数
      let deepth = 0
      let parent = this.$parent
      while (parent) {
        const vnodeData = parent.$vnode && parent.$vnode.data
        if (vnodeData && vnodeData.routerView) {
          deepth++
        }
        parent = parent.$parent
      }
      let comp = null
      const route = this.$router.matched[deepth]
      route && (comp = route.component)
      window.console.log(deepth)
      return h(comp)
    }
  })
}
export default Router
