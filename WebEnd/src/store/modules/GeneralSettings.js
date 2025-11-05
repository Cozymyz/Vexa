/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-11-05 21:54:07
 * @Description: 
 */
import { GeneralSettings } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    generalSettings: [],
    loading: false
  }),
  mutations: {
    SET_GENERAL_SETTINGS(state, payload) {
      state.generalSettings = payload
    }
  },
  actions: {
    async fetchGeneralSetting({ commit }) {
      this.loading = true
      try {
        const response = await GeneralSettings()
        console.log(response)
        const generalSettings = response.data.generalSettings
        commit('SET_GENERAL_SETTINGS', generalSettings)
        return generalSettings
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}