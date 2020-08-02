/*
 * @Author: sundada
 * @Date: 2020-08-02 16:23:32
 * @Last Modified by: sundada
 * @Last Modified time: 2020-08-02 21:04:06
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
    this._vm = new Svue({
      data: {
        $$state: options.state
      }
    })
    const store = this
    // this.commit = this.commit.bind(store)
    const { commit, dispatch } = this
    this.commit = function (...args) {
      commit.call(store, ...args)
    }
    this.dispatch = function (...args) {
      return dispatch.call(store, ...args)
    }
  }
  get state () {
    return this._vm._data.$$state
  }
  //这样做的额目的是不可以直接给state赋值，比如：this.state = {}，这样会报错，但是可以给state中的属性赋值，this.state.name = 'sundada'这是没有问题的
  set state (v) {
    console.error('please use replaceState to reset state')
  }
  commit (type, payload) {
    console.log(this)
    const entry = this._mutations[type]
    if (!entry) {
      console.error('no entry')
      return
    }
    entry(this.state, payload)
  }
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (!entry) {
      console.error('没有相应的actions')
      return
    }
    console.log(this)
    return entry(this, payload)
  }
}
export default { install, Store }
