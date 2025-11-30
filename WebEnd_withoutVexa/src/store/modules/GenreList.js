/*
 * @Author: Meiyizhi
 * @Date: 2025-11-30 22:06:20
 * @LastEditTime: 2025-12-01 00:12:44
 * @Description: 
 */
import { GenreList } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    genreLists: [],
  }),
  mutations: {
    SET_GENRE_LIST(state, payload) {
      state.genreLists = payload
    }
  },
  actions: {
    async fetchGenreList({ commit }) {
      try {
        const response = await GenreList()
        console.log(response)
        const genreLists = response.data.genreLists
        commit('SET_GENRE_LIST', genreLists)
        return genreLists
      } catch (error) {
        console.error('load menudata failed:', error)
      }
    }
  }
}