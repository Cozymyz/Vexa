// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - ReviewList
// Generation time: 2026-04-07 11:55:02
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// reviewLists:{'reviewId': 'number', 'reviewName': 'string', 'reviewContent': 'string'}
// GENERATED_CONTENT_END:module_header

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    // GENERATED_CONTENT_START:state_generated_field
    reviewLists: [],
    // GENERATED_CONTENT_END:state_generated_field
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_REVIEW_LIST(state, payload) {
      state.reviewLists = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
  },

  actions: {
    // GENERATED_CONTENT_START:action_fetch_data
    async fetchReviewList({ commit }) {
      try {
        const response = await api.()
        commit('SET_REVIEW_LIST', response.data)
        return response.data
      } catch (error) {
        console.error('load ReviewList failed:', error)
        throw error
      }
    },
    // GENERATED_CONTENT_END:action_fetch_data
  }
}