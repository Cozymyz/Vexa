/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 23:58:07
 * @LastEditTime: 2025-06-09 00:22:52
 * @Description: 
 */
import axios from '../plugins/request'

export const test = (data) =>{
    return axios({
        url: '/menu/allMenuGroup',
        method: 'post',
        data
    })
}
