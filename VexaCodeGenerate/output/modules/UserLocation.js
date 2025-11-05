// Automatically generated Vuex module - UserLocation
// Generation time: 2025-11-05 21:36:01
// userLocations:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    userLocations: [],
  }),

  mutations: {
    SET_USER_LOCATION(state, payload) {
      state.userLocations = payload
    },
  },

  actions: {
    async fetchUserLocation({ commit }) {
      try {
        const response = await api.()
        commit('SET_USER_LOCATION', response.data)
        return response.data
      } catch (error) {
        console.error('load UserLocation failed:', error)
        throw error
      }
    }
  }
}