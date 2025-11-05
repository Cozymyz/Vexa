/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 22:52:23
 * @LastEditTime: 2025-11-05 22:04:02
 * @Description: 
 */
import {
	createRouter,
	createWebHistory
} from "vue-router"

import index from '../components/Index.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: index,
        },
        // {
        //     path: "/:pathMatch(.*)*",
        //     component: notFound
        // },
    ]
})

export default router