// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - UserLocation
// Generation time: 2026-04-07 11:54:27
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// userLocations:{'userlocationId': 'number', 'userlocationName': 'string', 'userlocationIntroduce': 'string'}
// GENERATED_CONTENT_END:module_header

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    // GENERATED_CONTENT_START:state_generated_field
    userLocations: [],
    // GENERATED_CONTENT_END:state_generated_field
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_USER_LOCATION(state, payload) {
      state.userLocations = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
  },

  actions: {
    // GENERATED_CONTENT_START:action_fetch_data
    async fetchUserLocation({ commit }) {
      try {
        const response = await api.()
        commit('SET_USER_LOCATION', response.data)
        return response.data
      } catch (error) {
        console.error('load UserLocation failed:', error)
        throw error
      }
    },
    // GENERATED_CONTENT_END:action_fetch_data
  }
}