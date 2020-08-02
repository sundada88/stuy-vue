
import Vue from 'vue'
import Svuex from './store'
Vue.use(Svuex)
export default new Svuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add (state, payload) {
      state.count += payload
    }
  },
  actions: {
    addAsync ({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('add', 10)
          resolve(1)
        }, 2000)
      })
    }
  },
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
})
