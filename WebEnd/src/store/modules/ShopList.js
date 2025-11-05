/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-11-05 21:55:04
 * @Description: 
 */
import { ShopList } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    shopLists: [],
    loading: false
  }),
  mutations: {
    SET_SHOP_LIST(state, payload) {
      state.shopLists = payload
    }
  },
  actions: {
    async fetchShopList({ commit }) {
      this.loading = true
      try {
        const response = await ShopList()
        console.log(response)
        const shopLists = response.data.shopLists
        commit('SET_SHOP_LIST', shopLists)
        return shopLists
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}