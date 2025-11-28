<!--
 * @Author: Meiyizhi
 * @Date: 2025-10-22 23:36:46
 * @LastEditTime: 2025-11-19 15:30:29
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

<script lang="ts">
export default {
  vuexModule: [
    {
      name: 'GeneralSettings',
      extent: 'session'
    },
    
    {
      name: 'ShopList',
      extent: 'component'
    }
  ]
}
</script>

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

// 修改后的 fetchGeneralSetting 函数
const fetchGeneralSetting = async (skipIfExists = true) => {
  const moduleName = "GeneralSettings"
  console.log(`准备加载模块: ${moduleName}`)
  // 检查模块是否已存在
  if (store.hasModule(moduleName)) {
    console.log(`模块 ${moduleName} 已存在`)
    if (skipIfExists) {
      return { success: true, skipped: true, reason: '模块已存在' }
    }
  }
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchGeneralSetting`)
    console.log(`action 分发成功: ${moduleName}/fetchGeneralSetting`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

// 修改后的 fetchShopList 函数
const fetchShopList = async (skipIfExists = false) => {
  const moduleName = "ShopList"
  console.log(`准备加载模块: ${moduleName}`)
  // 检查模块是否已存在
  if (store.hasModule(moduleName)) {
    console.log(`模块 ${moduleName} 已存在`)
    if (skipIfExists) {
      return { success: true, skipped: true, reason: '模块已存在' }
    }
  }
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchShopList`)
    console.log(`action 分发成功: ${moduleName}/fetchShopList`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

// Load all module data on mount
onMounted(() => {
  if (internalVisible.value) {
        console.log('组件挂载时可见，开始加载数据')
        fetchAllModules()
    }
})

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