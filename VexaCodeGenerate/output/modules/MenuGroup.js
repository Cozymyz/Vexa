// Automatically generated Vuex module - MenuGroup
// Generation time: 2025-08-08 23:36:47
// menuGroups:{'groupId': 'number', 'groupName': 'string', 'displayOrder': 'number'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    menuGroups: [],
  }),

  mutations: {
    SET_MENU_GROUP(state, payload) {
      state.menuGroups = payload
    },
  },

  actions: {
    async fetchMenuGroup({ commit }) {
      try {
        const response = await api.()
        commit('SET_MENU_GROUP', response.data)
        return response.data
      } catch (error) {
        console.error('load MenuGroup failed:', error)
        throw error
      }
    }
  }
}