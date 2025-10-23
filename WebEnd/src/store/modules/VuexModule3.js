/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-10-23 16:27:33
 * @Description: 
 */
import { vuexmodule3 } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    vuexmodule3List: [],
    loading: false
  }),
  mutations: {
    SET_VUEXMODULE3_LIST(state, payload) {
      state.vuexmodule3List = payload
    }
  },
  actions: {
    async fetchVuexModule3({ commit }) {
      this.loading = true
      try {
        const response = await vuexmodule3()
        console.log(response)
        const vuexmodule3List = response.data.vuexmodule3List
        commit('SET_VUEXMODULE3_LIST', vuexmodule3List)
        return vuexmodule3List
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}