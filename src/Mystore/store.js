/*
 * @Author: sundada
 * @Date: 2020-08-02 16:23:32
 * @Last Modified by: sundada
 * @Last Modified time: 2020-08-02 17:17:48
 */

/* eslint-disable */
let Svue
function install (Vue) {
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
    this.$options = options
    this._mutations = options.mutations
    this._actions = options.actions
    this.getters = {}
    // this._getters = options.getters
    this.state = new Svue({
      data: options.state
    })
    this.initGetters(options.getters)
  }
  // 注意：写成箭头函数的原因是，在dispatch的时候，如果commit被setTimeout等包围的时候，就会出现this的问题
  commit = (type, payload) => {
    this._mutations[type](this.state, payload)
  }
  dispatch (type) {
    return this._actions[type](this)
  }
  // getters是一个只读的
  initGetters (getters) {
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          // 每次当state中的值发生改变的时候，就会触发这个getters的值发生改变
          return getters[key](this.state)
        }
      })
    })
  }
}
export default { install, Store }
