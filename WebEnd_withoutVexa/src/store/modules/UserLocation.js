/*
 * @Author: Meiyizhi
 * @Date: 2025-11-30 22:06:47
 * @LastEditTime: 2025-12-01 00:12:57
 * @Description: 
 */
import { UserLocation } from '@/api/axios'

export default {
  namespaced: true,
  state: () => ({
    userLocations: [],
  }),
  mutations: {
    SET_USER_LOCATION(state, payload) {
      state.userLocations = payload
    }
  },
  actions: {
    async fetchUserLocation({ commit }) {
      try {
        const response = await UserLocation()
        console.log(response)
        const userLocations = response.data.userLocations
        commit('SET_USER_LOCATION', userLocations)
        return userLocations
      } catch (error) {
        console.error('load menudata failed:', error)
      }
    }
  }
}