// Automatically generated Vuex module - Test
// Generation time: 2025-07-01 16:05:23
// testList:{'testId': 'number', 'testName': 'string', 'displayOrder': 'number'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    testList: [],
  }),

  mutations: {
    SET_TEST(state, payload) {
      state.testList = payload
    },
  },

  actions: {
    async fetchTest({ commit }) {
      try {
        const response = await api.()
        commit('SET_TEST', response.data)
        return response.data
      } catch (error) {
        console.error('load Test failed:', error)
        throw error
      }
    }
  }
}