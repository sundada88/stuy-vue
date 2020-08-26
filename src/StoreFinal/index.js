import Vue from 'vue'
import Vuex from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    add (state) {
      state.count++
    }
  },
  actions: {
    addAsync ({ commit }) {
      setTimeout(() => {
        commit('add')
      }, 2000)
    }
  },
  modules: {
  }
})
