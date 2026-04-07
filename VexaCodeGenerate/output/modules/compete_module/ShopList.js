// GENERATED_CONTENT_START:module_header
// Automatically generated Vuex module - ShopList
// Generation time: 2026-04-07 10:23:55
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// shopLists:{'shopId': 'number', 'shopName': 'string', 'shopIntroduce': 'string'}
// GENERATED_CONTENT_END:module_header

import api from '@/api'

export default {
  namespaced: true,

  state: () => ({
    // GENERATED_CONTENT_START:state_generated_field
    shopLists: [],
    // GENERATED_CONTENT_END:state_generated_field
    selectedShopId: null,
  }),

  mutations: {
    // GENERATED_CONTENT_START:mutation_set_data
    SET_SHOP_LIST(state, payload) {
      state.shopLists = payload
    },
    // GENERATED_CONTENT_END:mutation_set_data
    SET_SELECTED_SHOP(state, shopId) {
      state.selectedShopId = shopId
    },
  },

  actions: {
    // GENERATED_CONTENT_START:action_fetch_data
    async fetchShopList({ commit }) {
      try {
        const response = await api.()
        commit('SET_SHOP_LIST', response.data)
        return response.data
      } catch (error) {
        console.error('load ShopList failed:', error)
        throw error
      }
    },
    // GENERATED_CONTENT_END:action_fetch_data
    async toggleShopSelection({ commit, state, getters }, shopId) {

      const newSelection = state.selectedShopId === shopId ? null : shopId
      commit('SET_SELECTED_SHOP', newSelection)

      const selectedShop = getters.selectedShopDetails
      console.log('selectedShop is updated:', selectedShop)
      return selectedShop
    },
  },

  getters: {
    selectedShopDetails(state) {
      if (!state.selectedShopId) return null
      return state.shopLists.find(shop => shop.shopId === state.selectedShopId)
    }
  }
}