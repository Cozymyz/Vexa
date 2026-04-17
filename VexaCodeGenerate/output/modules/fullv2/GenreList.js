// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - GenreList
// Generation time: 2026-04-07 11:55:02
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// genreLists:{'genreId': 'number', 'genreName': 'string', 'genreIntroduce': 'string'}
// GENERATED_CONTENT_END:module_header

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    // GENERATED_CONTENT_START:state_generated_field
    genreLists: [],
    // GENERATED_CONTENT_END:state_generated_field
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_GENRE_LIST(state, payload) {
      state.genreLists = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
  },

  actions: {
    // GENERATED_CONTENT_START:action_fetch_data
    async fetchGenreList({ commit }) {
      try {
        const response = await api.()
        commit('SET_GENRE_LIST', response.data)
        return response.data
      } catch (error) {
        console.error('load GenreList failed:', error)
        throw error
      }
    },
    // GENERATED_CONTENT_END:action_fetch_data
  }
}