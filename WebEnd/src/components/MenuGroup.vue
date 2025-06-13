<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-10 20:03:19
 * @LastEditTime: 2025-06-11 16:32:22
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
                v-for="group in menuGroups" 
                :key="group.groupId"
                :index="group.groupId.toString()"
            >
                <span>{{ group.groupName }}</span>
            </el-menu-item>
        </el-menu>
    </el-drawer>
</template>

<script lang="ts">
export default {
  vuexModule: {
    name: 'MenuGroup',
    extent: 'session'
  }
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useStore } from 'vuex'

interface MenuGroup {
  groupId: number
  groupName: string
  displayOrder: number
}

const vuexModule = {
  name: 'MenuGroup',
  extent: 'session'
}

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
        fetchMenuGroups()
    }
})

// wait for module mounted
const waitForModule = (moduleName: string, timeout = 2000) => {
  return new Promise<void>((resolve, reject) => {
    const checkInterval = 50 // check ever 50ms
    let elapsed = 0
    
    const interval = setInterval(() => {
      if (store.hasModule(moduleName)) {
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

// 修改后的 fetchMenuGroups 函数
const fetchMenuGroups = async () => {
  const moduleName = vuexModule.name
  console.log(`准备加载模块: ${moduleName}`)
  
  try {
    // 等待模块加载完成
    await waitForModule(moduleName)
    console.log(`模块 ${moduleName} 已加载，开始分发 action`)
    
    // 现在模块已加载，可以安全调用 dispatch
    await store.dispatch(`${moduleName}/fetchMenuGroups`)
    console.log(`action 分发成功: ${moduleName}/fetchMenuGroups`)
    
  } catch (error) {
    console.error(`等待或加载失败: ${error.message}`)
    throw error
  }
}

// 计算属性获取菜单组数据
const menuGroups = computed((): MenuGroup[] => {
  const moduleName = vuexModule.name
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