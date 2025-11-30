/*
 * @Author: Meiyizhi
 * @Date: 2025-11-29 23:04:42
 * @LastEditTime: 2025-11-29 23:06:49
 * @Description: 
 */
import axios from 'axios'
import Route from '../router/router.js'
// 创建axios 实例
const service = axios.create({
  timeout: 10000000, // 请求超时时间
  baseURL:"/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use((config) => {
	//若请求方式为post，则将data参数转为JSON字符串
	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data)
	}
    return config
  },(error) => {
    //  这里处理一些请求出错的情况
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use((response) => {
    const res = response.data;
    // 这里处理一些response 正常放回时的逻辑
	console.log(response)
	console.log(response.data.message)
    return res
  },(error) => {
    // 这里处理一些response 出错时的逻辑
	console.log(error)
	if(error.response.message === 404){
		Route.push('/404')
	}
    return Promise.reject(error)
  }
)

export default service