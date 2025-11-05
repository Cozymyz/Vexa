/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:58:07
 * @LastEditTime: 2025-11-05 22:08:35
 * @Description: 
 */
import axios from '@/plugins/request'

export const test = (data) =>{
    return axios({
        url: '/menu/allMenuGroup',
        method: 'post',
        data
    })
}

export const GeneralSettings = (data) => {
    return axios({
        url: '/vuexmodule/1',
        method: 'post',
        data
    })
}

export const ShopList = (data) => {
    return axios({
        url: '/vuexmodule/2',
        method: 'post',
        data
    })
}

export const GenreList = (data) => {
    return axios({
        url: '/vuexmodule/3',
        method: 'post',
        data
    })
}

export const UserLocation = (data) => {
    return axios({
        url: '/vuexmodule/4',
        method: 'post',
        data
    })
}