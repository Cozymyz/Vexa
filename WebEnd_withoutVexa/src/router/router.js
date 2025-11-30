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