// Automatically generated Vuex module - VuexModule2
// Generation time: 2025-10-23 16:44:37
// vuexModule2s:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    vuexModule2s: [],
  }),

  mutations: {
    SET_VUEX_MODULE2(state, payload) {
      state.vuexModule2s = payload
    },
  },

  actions: {
    async fetchVuexModule2({ commit }) {
      try {
        const response = await api.()
        commit('SET_VUEX_MODULE2', response.data)
        return response.data
      } catch (error) {
        console.error('load VuexModule2 failed:', error)
        throw error
      }
    }
  }
}