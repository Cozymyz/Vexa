/*
 * @Author: Meiyizhi
 * @Date: 2025-06-08 22:52:23
 * @LastEditTime: 2025-06-08 23:31:17
 * @Description: 
 */

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "./router/router.js"
import store from "./store/index.js"

const app = createApp(App)
app.config.globalProperties.$host = "http://localhost:8080"
app.use(router)
app.use(store)
// app.use(vuexLazyLoad)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')