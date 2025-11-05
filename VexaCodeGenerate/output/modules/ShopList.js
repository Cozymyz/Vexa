// Automatically generated Vuex module - ShopList
// Generation time: 2025-11-05 21:36:01
// shopLists:{'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    shopLists: [],
  }),

  mutations: {
    SET_SHOP_LIST(state, payload) {
      state.shopLists = payload
    },
  },

  actions: {
    async fetchShopList({ commit }) {
      try {
        const response = await api.()
        commit('SET_SHOP_LIST', response.data)
        return response.data
      } catch (error) {
        console.error('load ShopList failed:', error)
        throw error
      }
    }
  }
}