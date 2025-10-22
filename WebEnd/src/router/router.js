/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 22:52:23
 * @LastEditTime: 2025-10-22 23:23:27
 * @Description: 
 */
import {
	createRouter,
	createWebHistory
} from "vue-router"

import index from '../components/Index.vue'
import MenuGroup from "../components/MenuGroup.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: index,
        },
        {
            path: '/test',
            component: MenuGroup,
        }
        // {
        //     path: "/:pathMatch(.*)*",
        //     component: notFound
        // },
    ]
})

export default router