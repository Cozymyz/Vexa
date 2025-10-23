/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-10-23 16:26:44
 * @Description: 
 */
import { vuexmodule2 } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    vuexmodule2List: [],
    loading: false
  }),
  mutations: {
    SET_VUEXMODULE2_LIST(state, payload) {
      state.vuexmodule2List = payload
    }
  },
  actions: {
    async fetchVuexModule2({ commit }) {
      this.loading = true
      try {
        const response = await vuexmodule2()
        console.log(response)
        const vuexmodule2List = response.data.vuexmodule2List
        commit('SET_VUEXMODULE2_LIST', vuexmodule2List)
        return vuexmodule2List
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}