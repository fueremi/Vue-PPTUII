import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null
  },
  mutations: {
    SET_SESSION(state, payload){
      state.session = payload
    }
  },
  actions: {
    setSession({commit}, payload){
      commit('SET_SESSION', payload)
    }
  }
})
