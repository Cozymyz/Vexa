// Automatically generated Vuex module - User
// Generation time: 2025-08-08 23:36:47
// userList:{'userId': 'number', 'username': 'string', 'email': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    userList: [],
  }),

  mutations: {
    SET_USER(state, payload) {
      state.userList = payload
    },
  },

  actions: {
    async fetchUser({ commit }) {
      try {
        const response = await api.()
        commit('SET_USER', response.data)
        return response.data
      } catch (error) {
        console.error('load User failed:', error)
        throw error
      }
    }
  }
}