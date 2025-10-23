// Automatically generated Vuex module - VuexModule4
// Generation time: 2025-10-23 16:44:37
// vuexModule4s:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    vuexModule4s: [],
  }),

  mutations: {
    SET_VUEX_MODULE4(state, payload) {
      state.vuexModule4s = payload
    },
  },

  actions: {
    async fetchVuexModule4({ commit }) {
      try {
        const response = await api.()
        commit('SET_VUEX_MODULE4', response.data)
        return response.data
      } catch (error) {
        console.error('load VuexModule4 failed:', error)
        throw error
      }
    }
  }
}