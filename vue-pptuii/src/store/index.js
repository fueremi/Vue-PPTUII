import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: {
      id: '',
      user_id: ''
    }
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
  },
  getters: {

  }
})
