// Automatically generated Vuex module - VuexModule1
// Generation time: 2025-10-23 16:44:37
// vuexModule1s:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    vuexModule1s: [],
  }),

  mutations: {
    SET_VUEX_MODULE1(state, payload) {
      state.vuexModule1s = payload
    },
  },

  actions: {
    async fetchVuexModule1({ commit }) {
      try {
        const response = await api.()
        commit('SET_VUEX_MODULE1', response.data)
        return response.data
      } catch (error) {
        console.error('load VuexModule1 failed:', error)
        throw error
      }
    }
  }
}