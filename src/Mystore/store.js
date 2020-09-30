/*
 * @Author: sundada
 * @Date: 2020-08-02 16:23:32
 * @Last Modified by: sundada
 * @Last Modified time: 2020-09-30 09:46:31
 */

/* eslint-disable */
let Svue
function install (Vue) {
  Svue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
class Store {
  constructor(options) {
    this.$options = options
    this.vm = new Svue({
      data: {
        $$data: this.$options.state
      },
      // 将getters以computed的方式获取
      computed: this.initGetters()
    })
    this.$mutations = this.$options.mutations
    this.$actions = this.$options.actions
    // 绑定mutations的this
    const store = this
    const { commit, dispatch } = this
    this.commit = function (...args) {
      commit.call(store, ...args)
    }
    this.dispatch = function (...args) {
      dispatch.call(store, ...args)
    }
  }
  get state () {
    return this.vm._data.$$data
  }
  get getters () {
    return this.vm
  }
  initGetters () {
    const obj = {}
    Object.keys(this.$options.getters).forEach(getter => {
      obj[getter] = () => {
        return this.$options.getters[getter].call(this, this.state)
      }
    })
    console.log(obj)
    return obj
  }
  commit (type, payload) {
    const method = this.$mutations[type]
    method && method(this.state, payload)
  }
  dispatch (type, payload) {
    const method = this.$actions[type]
    return method && method(this, payload)
  }
}
export default { install, Store }
