// Automatically generated Vuex module - GeneralSettings
// Generation time: 2025-11-05 21:36:01
// generalSettings:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    generalSettings: [],
  }),

  mutations: {
    SET_GENERAL_SETTINGS(state, payload) {
      state.generalSettings = payload
    },
  },

  actions: {
    async fetchGeneralSetting({ commit }) {
      try {
        const response = await api.()
        commit('SET_GENERAL_SETTINGS', response.data)
        return response.data
      } catch (error) {
        console.error('load GeneralSettings failed:', error)
        throw error
      }
    }
  }
}