/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:58:07
 * @LastEditTime: 2025-10-23 16:25:23
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

export const vuexmodule1 = (data) => {
    return axios({
        url: '/vuexmodule/1',
        method: 'post',
        data
    })
}

export const vuexmodule2 = (data) => {
    return axios({
        url: '/vuexmodule/2',
        method: 'post',
        data
    })
}

export const vuexmodule3 = (data) => {
    return axios({
        url: '/vuexmodule/3',
        method: 'post',
        data
    })
}

export const vuexmodule4 = (data) => {
    return axios({
        url: '/vuexmodule/4',
        method: 'post',
        data
    })
}