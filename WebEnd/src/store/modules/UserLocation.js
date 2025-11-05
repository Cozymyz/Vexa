/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 21:59:26
 * @LastEditTime: 2025-11-05 21:57:10
 * @Description: 
 */
import { UserLocation } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    userLocations: [],
    loading: false
  }),
  mutations: {
    SET_USER_LOCATION(state, payload) {
      state.userLocations = payload
    }
  },
  actions: {
    async fetchUserLocation({ commit }) {
      this.loading = true
      try {
        const response = await UserLocation()
        console.log(response)
        const userLocations = response.data.userLocations
        commit('SET_USER_LOCATION', userLocations)
        return userLocations
      } catch (error) {
        console.error('load menudata failed:', error)
      } finally {
        this.loading = false
      }
    }
  }
}