/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-06-11 00:32:48
 * @Description: 
 */
import { test } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    menuGroups: [],
    loading: false
  }),
  mutations: {
    SET_MENU_GROUPS(state, payload) {
      state.menuGroups = payload
    }
  },
  actions: {
    async fetchMenuGroups({ commit }) {
      this.loading = true
      try {
        const response = await test()
        console.log(response)
        const menuGroups = response.data.allMenuGroupList
        commit('SET_MENU_GROUPS', menuGroups)
        return menuGroups
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}