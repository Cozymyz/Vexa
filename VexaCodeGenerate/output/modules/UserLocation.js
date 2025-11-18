// Automatically generated Vuex module - UserLocation
// Generation time: 2025-11-18 21:55:47
// userLocations:{'userlocationId': 'number', 'userlocationName': 'string', 'userlocationIntroduce': 'string'}

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