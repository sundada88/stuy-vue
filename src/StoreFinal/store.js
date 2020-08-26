/* eslint-disable */
let vue
class Store {
  constructor(options) {
    this.$options = options
    this.$vm = new vue({
      data: {
        $$state: options.state
      }
    })
    this._mutations = options.mutations
    this._actions = options.actions
    const { commit, dispatch } = this
    const store = this
    this.commit = function (...args) {
      commit.call(store, ...args)
    }
    this.dispatch = function (...args) {
      dispatch.call(store, ...args)
    }
  }
  get state () {
    return this.$vm._data.$$state
  }
  commit (type, payload) {
    const fn = this._mutations[type]
    fn && fn(this.state, payload)
  }
  dispatch (type) {
    const fn = this._actions[type]
    return fn && fn(this)
  }
}
function install (Vue) {
  vue = Vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options && this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default { Store, install }
