<!--
 * @Author: Meiyizhi
 * @Date: 2025-11-29 23:00:58
 * @LastEditTime: 2025-12-01 00:03:22
 * @Description: 
-->
<template>
    <el-drawer
        :model-value="internalVisible"
        title="Menu"
        direction="ltr"
        :with-header="false"
        :before-close="handleBeforeClose"
        @update:model-value="handleDrawerChange"
    >
        <el-menu
            text-color="#000"
            active-text-color="#409EFF"
            unique-opened
            router
        >
            <el-menu-item
                v-for="module in vuexModule" 
                :key="module.name"
            >
                <span>{{ module.name }}</span>
            </el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

interface GeneralSettings {
    
    settingId: number, 
    
    settingName: string, 
    
    settingIntroduce: string
    
}

interface ShopList {
    
    shopId: number, 
    
    shopName: string, 
    
    shopIntroduce: string
    
}

const vuexModule = [
  {
    name: 'GeneralSettings',
    extent: 'session'
  },
  {
    name: 'ShopList',
    extent: 'component'
  }
]

const emit = defineEmits(['update:visible', 'refresh'])
const store = useStore()
const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

const internalVisible = ref(props.visible)
watch(() => props.visible, (newVal) => {
    internalVisible.value = newVal
})

// Load all module data on mount
onMounted(async () => {
    try {
        for (const module of vuexModule) await registerModule(module.name)
        if (internalVisible.value) {
            console.log('组件挂载时可见，开始加载数据')
            fetchAllModules()
        }
    } catch (error) {
        console.error('模块注册或数据加载失败:', error)
    }
})

onUnmounted(() => {
    // 根据模块的作用域卸载模块
    vuexModule.forEach(module => {
        unregisterModule(module.name, module.extent)
    })
})

const loadModule = async (moduleName: string) => {
    try {
        const module = await import(/* @vite-ignore */`../store/modules/${moduleName}.js`)
        console.log('模块是否加载确认',store.hasModule(moduleName))
        return module.default
    } catch (error) {
        console.error(`加载模块 ${moduleName} 失败:`, error)
        throw error
    }
}

// wait for module mounted
const waitForModule = (moduleName: string, timeout = 2000) => {
  return new Promise<void>((resolve, reject) => {
    const checkInterval = 50 // check ever 50ms
    let elapsed = 0
    
    const interval = setInterval(() => {
      if (store.hasModule(moduleName)) {
        console.log('already have: ', moduleName)
        clearInterval(interval)
        resolve()
      } else {
        elapsed += checkInterval
        if (elapsed >= timeout) {
          clearInterval(interval)
          reject(new Error(`等待模块超时: ${moduleName}`))
        }
      }
    }, checkInterval)
  })
}

//registerModule
const registerModule = async (moduleName: string) => {
    if(!store.hasModule(moduleName)){
        try {
            const vuexModule = await loadModule(moduleName)
            if(vuexModule) {
                store.registerModule(moduleName, vuexModule)
                await waitForModule(moduleName)
                console.log(`Module ${moduleName} registered successfully`)
                return true
            } else {
                console.error(`Module ${moduleName} does not exsist`)
                return false
            }
        } catch (error) {
            console.error(`注册模块 ${moduleName} 失败:`, error)
            return false
        }    
    }
    await waitForModule(moduleName)
    console.log(`Module ${moduleName} already exsist`)
    return true
}

// unregisterModule
const unregisterModule = (moduleName: string, extent: string) => {
    if (store.hasModule(moduleName)) {
        if (extent === 'session') {
            console.log(`模块 ${moduleName} 作用域为 ${extent}，跳过卸载`)
            return
        }
        store.unregisterModule(moduleName)
        console.log(`模块 ${moduleName} 卸载成功`)
    }
}

const fetchGeneralSetting = async () => {
    const moduleName = "GeneralSettings"
    try {
        await store.dispatch(`${moduleName}/fetchGeneralSetting`)
        console.log(`action 分发成功: ${moduleName}/fetchGeneralSetting`)
    } catch (error) {
        console.error(`等待或加载失败: ${error.message}`)
        throw error
    }
}

const fetchShopList = async () => {
    const moduleName = "ShopList"
    try {
        await store.dispatch(`${moduleName}/fetchShopList`)
        console.log(`action 分发成功: ${moduleName}/fetchShopList`)
    } catch (error) {
        console.error(`等待或加载失败: ${error.message}`)
        throw error
    }
}

// Get all module data in parallel
const fetchAllModules = async () => {
    try {
        await Promise.all([
            
            fetchGeneralSetting(),
            fetchShopList()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}

// 处理抽屉状态变化
const handleDrawerChange = (newValue: boolean) => {
    internalVisible.value = newValue
    emit('update:visible', newValue)
}

// 关闭前的回调
const handleBeforeClose = (done: () => void) => {
    done()
    internalVisible.value = false
    emit('update:visible', false)
}

</script>