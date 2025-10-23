// Automatically generated Vuex module - VuexModule3
// Generation time: 2025-10-23 16:44:37
// vuexModule3s:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    vuexModule3s: [],
  }),

  mutations: {
    SET_VUEX_MODULE3(state, payload) {
      state.vuexModule3s = payload
    },
  },

  actions: {
    async fetchVuexModule3({ commit }) {
      try {
        const response = await api.()
        commit('SET_VUEX_MODULE3', response.data)
        return response.data
      } catch (error) {
        console.error('load VuexModule3 failed:', error)
        throw error
      }
    }
  }
}