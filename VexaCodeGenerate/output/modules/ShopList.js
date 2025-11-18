// Automatically generated Vuex module - ShopList
// Generation time: 2025-11-18 21:55:47
// shopLists:{'shopId': 'number', 'shopName': 'string', 'shopIntroduce': 'string'}

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