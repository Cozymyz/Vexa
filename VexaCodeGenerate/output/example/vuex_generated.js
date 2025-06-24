// by developer
import { api } from 'api_url'  

// automatially generate
export default {
  namespaced: true,
  state: () => ({
    menuGroups: [],
  }),
  mutations: {
    SET_MENU_GROUPS(state, payload) {
      state.menuGroups = payload
    }
  },
  actions: {
    async fetchMenuGroups({ commit }) {
      try {
        const response = await api()
        console.log(response)
        const menuGroups = response.data
        commit('SET_MENU_GROUPS', menuGroups)
        return menuGroups
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
      }
    }
  }
}