// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - GenreList
// Generation time: 2026-04-07 10:23:55
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
    currentEditingGenre: null,
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_GENRE_LIST(state, payload) {
      state.genreLists = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
    SET_CURRENT_EDITING_GENRE(state, genre) {
      state.currentEditingGenre = genre
    },
    CLEAR_CURRENT_EDITING_GENRE(state) {
      state.currentEditingGenre = null
    },
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
    async saveGenre({ commit, state }, genreData) {
      try {
        const isEdit = genreData.genreId && state.currentEditingGenre
        const method = isEdit ? 'put' : 'post'
        const url = isEdit ? `/genres/${genreData.genreId}` : '/genres'

        // Hypothetical API call
        const response = { data: { ...genreData, genreId: isEdit ? genreData.genreId : Date.now() } }

        if (isEdit) {
          const index = state.genreLists.findIndex(g => g.genreId === genreData.genreId)
          if (index !== -1) {
            state.genreLists.splice(index, 1, response.data)
          }
        } else {
          state.genreLists.push(response.data)
        }
        commit('CLEAR_CURRENT_EDITING_GENRE')
        return response.data
      } catch (error) {
        console.error('Genre saving failed:', error)
        throw error
      }
    },
  }
}