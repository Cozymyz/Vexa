/*
 * @Author: Meiyizhi
 * @Date: 2025-11-30 22:06:27
 * @LastEditTime: 2025-12-01 00:11:41
 * @Description: 
 */
import { ShopList } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    shopLists: [],
  }),
  mutations: {
    SET_SHOP_LIST(state, payload) {
      state.shopLists = payload
    }
  },
  actions: {
    async fetchShopList({ commit }) {
      try {
        const response = await ShopList()
        console.log(response)
        const shopLists = response.data.shopLists
        commit('SET_SHOP_LIST', shopLists)
        return shopLists
      } catch (error) {
        console.error('load menudata failed:', error)
      }
    }
  }
}