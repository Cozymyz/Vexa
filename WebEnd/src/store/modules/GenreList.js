/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-11-05 21:56:21
 * @Description: 
 */
import { GenreList } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    genreLists: [],
    loading: false
  }),
  mutations: {
    SET_GENRE_LIST(state, payload) {
      state.genreLists = payload
    }
  },
  actions: {
    async fetchGenreList({ commit }) {
      this.loading = true
      try {
        const response = await GenreList()
        console.log(response)
        const genreLists = response.data.genreLists
        commit('SET_GENRE_LIST', genreLists)
        return genreLists
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}