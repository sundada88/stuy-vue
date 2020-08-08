/*
 * @Author: sundada
 * @Date: 2020-08-02 16:23:32
 * @Last Modified by: sundada
 * @Last Modified time: 2020-08-04 10:34:41
 */

/* eslint-disable */
let Svue
function install (Vue) {
  if (install.installed) return
  install.installed = true
  Svue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
class Store {
  constructor(options) {
    const that = this
    this._vm = new Svue({
      data: {
        $$state: options.state
      },
      computed: that.initGetters(options.getters)
    })
    this._mutations = options.mutations
    this._actions = options.actions
    // this.getters = {}
    const store = this
    const { commit, dispatch } = this
    this.commit = function (...args) {
      commit.call(store, ...args)
    }
    this.dispatch = function (...args) {
      return dispatch.call(store, ...args)
    }
    // this.initGetters(options.getters)
  }
  get state () {
    return this._vm._data.$$state
  }
  set state (value) {
    console.error('不可以被赋值')
  }
  get getters () {
    console.log(this._vm)
    return this._vm
  }
  commit (type, payload) {
    const entry = this._mutations[type]
    if (!entry) {
      console.error('没有相应的mutation')
    }
    entry(this.state, payload)
  }
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('没有对应的action')
    }
    return entry(this, payload)
  }
  initGetters (getters) {
    // Object.keys(getters).forEach(getter => {
    //   console.log(this.getters)
    //   console.log(getter)
    //   console.log(getters[getter](this.state))
    //   Object.defineProperty(this.getters, getter, {
    //     get: () => {
    //       return getters[getter](this.state)
    //     }
    //   })
    // })
    const obj = {}
    Object.keys(getters).forEach(getter => {
      obj[getter] = () => {
        return getters[getter](this.state)
      }
    })
    return obj
  }
}
export default { install, Store }
