/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:58:07
 * @LastEditTime: 2025-07-01 17:24:31
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
