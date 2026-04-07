// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - GeneralSettings
// Generation time: 2026-04-07 10:23:55
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// generalSettings:{'settingId': 'number', 'settingName': 'string', 'settingIntroduce': 'string'}
// GENERATED_CONTENT_END:module_header

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    // GENERATED_CONTENT_START:state_generated_field
    generalSettings: [],
    // GENERATED_CONTENT_END:state_generated_field
    userTheme: 'light', // User Interface Theme Preferences
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_GENERAL_SETTINGS(state, payload) {
      state.generalSettings = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
    SET_USER_THEME(state, theme) {
      state.userTheme = theme
      console.log('The theme has been updated to:', theme)
    },
  },

  actions: {
    // GENERATED_CONTENT_START:action_fetch_data
    async fetchGeneralSetting({ commit }) {
      try {
        const response = await api.()
        commit('SET_GENERAL_SETTINGS', response.data)
        return response.data
      } catch (error) {
        console.error('load GeneralSettings failed:', error)
        throw error
      }
    },
    // GENERATED_CONTENT_END:action_fetch_data
    async updateUserTheme({ commit, state }, newTheme) {
      try {
        // Hypothetical API call
        await api.post('/user/preferences/theme', { theme: newTheme })
        commit('SET_USER_THEME', newTheme)
        return { success: true, theme: state.userTheme }
      } catch (error) {
        console.error('Theme saving failed:', error)
        throw error
      }
    },
  }
}