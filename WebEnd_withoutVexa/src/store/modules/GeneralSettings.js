import { GeneralSettings } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    generalSettings: [],
  }),
  mutations: {
    SET_GENERAL_SETTINGS(state, payload) {
      state.generalSettings = payload
    }
  },
  actions: {
    async fetchGeneralSetting({ commit }) {
      try {
        const response = await GeneralSettings()
        console.log(response)
        const generalSettings = response.data.generalSettings
        commit('SET_GENERAL_SETTINGS', generalSettings)
        return generalSettings
      } catch (error) {
        console.error('load menudata failed:', error)
      }
    }
  }
}