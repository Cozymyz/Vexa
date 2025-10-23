/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-10-23 16:23:01
 * @Description: 
 */
import { vuexmodule1 } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    vuexmodule1List: [],
    loading: false
  }),
  mutations: {
    SET_VUEXMODULE1_LIST(state, payload) {
      state.vuexmodule1List = payload
    }
  },
  actions: {
    async fetchVuexModule1({ commit }) {
      this.loading = true
      try {
        const response = await vuexmodule1()
        console.log(response)
        const vuexmodule1List = response.data.vuexmodule1List
        commit('SET_VUEXMODULE1_LIST', vuexmodule1List)
        return vuexmodule1List
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}