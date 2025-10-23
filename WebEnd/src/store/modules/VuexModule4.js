/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-10-23 16:28:15
 * @Description: 
 */
import { vuexmodule4 } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    vuexmodule4List: [],
    loading: false
  }),
  mutations: {
    SET_VUEXMODULE4_LIST(state, payload) {
      state.vuexmodule4List = payload
    }
  },
  actions: {
    async fetchVuexModule4({ commit }) {
      this.loading = true
      try {
        const response = await vuexmodule4()
        console.log(response)
        const vuexmodule4List = response.data.vuexmodule4List
        commit('SET_VUEXMODULE4_LIST', vuexmodule4List)
        return vuexmodule4List
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}