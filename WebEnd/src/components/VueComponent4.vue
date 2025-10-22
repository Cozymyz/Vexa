<!--
 * @Author: Meiyizhi
 * @Date: 2025-10-22 23:36:46
 * @LastEditTime: 2025-10-23 01:07:54
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
      name: 'VuexModule1',
      extent: 'session'
    },
    {
      name: 'VuexModule2',
      extent: 'component'
    },
    {
      name: 'VuexModule3',
      extent: 'component'
    },
    {
      name: 'VuexModule4',
      extent: 'component'
    }
  ]
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

interface VuexModule1 {
  groupId: number
  groupName: string
  displayOrder: number
}

interface VuexModule2 {
  groupId: number
  groupName: string
  displayOrder: number
}

interface VuexModule3 {
  groupId: number
  groupName: string
  displayOrder: number
}

interface VuexModule4 {
  groupId: number
  groupName: string
  displayOrder: number
}

const vuexModule = [
  {
    name: 'VuexModule1',
    extent: 'session'
  },
  {
    name: 'VuexModule2',
    extent: 'component'
  },
  {
    name: 'VuexModule3',
    extent: 'component'
  },
  {
    name: 'VuexModule4',
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

onMounted(() =>{
    if (internalVisible.value) {
        console.log('组件挂载时可见，开始加载数据')
        fetchVuexModule1()
        fetchVuexModule2()
        fetchVuexModule3()
        fetchVuexModule4()
    }
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

// 修改后的 fetchVuexModule1 函数
const fetchVuexModule1 = async () => {
  const moduleName = "VuexModule1"
  console.log(`准备加载模块: ${moduleName}`)
  
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchVuexModule1`)
    console.log(`action 分发成功: ${moduleName}/fetchVuexModule1`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

const fetchVuexModule2 = async () => {
  const moduleName = "VuexModule2"
  console.log(`准备加载模块: ${moduleName}`)
  
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchVuexModule2`)
    console.log(`action 分发成功: ${moduleName}/fetchVuexModule2`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

const fetchVuexModule3 = async () => {
  const moduleName = "VuexModule3"
  console.log(`准备加载模块: ${moduleName}`)
  
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchVuexModule3`)
    console.log(`action 分发成功: ${moduleName}/fetchVuexModule3`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

const fetchVuexModule4 = async () => {
  const moduleName = "VuexModule4"
  console.log(`准备加载模块: ${moduleName}`)
  
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchVuexModule4`)
    console.log(`action 分发成功: ${moduleName}/fetchVuexModule4`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

// 计算属性获取菜单组数据
const menuGroups = computed((): MenuGroup[] => {
  const moduleName = "VuexModule1"
  console.log(`[计算属性] 获取菜单组数据, 模块: ${moduleName}`)
  
  // 检查模块是否存在
  if (!store.hasModule(moduleName)) {
    console.log(`[计算属性] 模块 ${moduleName} 未注册`)
    return []
  }
  
  // 获取菜单组数据
  const moduleState = store.state[moduleName]
  
  // 检查是否有 menuGroups 属性
  if (!moduleState || !moduleState.menuGroups) {
    console.log(`[计算属性] 模块状态中没有 menuGroups 数据`)
    return []
  }
  
  console.log(`[计算属性] 获取到 ${moduleState.menuGroups.length} 个菜单组`)
  return moduleState.menuGroups
})

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