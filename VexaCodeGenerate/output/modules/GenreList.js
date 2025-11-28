// Automatically generated Vuex module - GenreList
// Generation time: 2025-11-19 15:24:52
// genreLists:{'genreId': 'number', 'genreName': 'string', 'genreIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    genreLists: [],
  }),

  mutations: {
    SET_GENRE_LIST(state, payload) {
      state.genreLists = payload
    },
  },

  actions: {
    async fetchGenreList({ commit }) {
      try {
        const response = await api.()
        commit('SET_GENRE_LIST', response.data)
        return response.data
      } catch (error) {
        console.error('load GenreList failed:', error)
        throw error
      }
    }
  }
}