<!--
 * @Author: Meiyizhi
 * @Date: 2025-06-17 21:24:55
 * @LastEditTime: 2025-06-18 15:01:09
 * @Description: 
-->
<template>
    <!-- by developer -->
</template>

<!-- by automatically generated -->
<script lang="ts">
export default {
  vuexModule: {
    name: 'MenuGroup',
    extent: 'session'
  }
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
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

const store = useStore()

onMounted(() =>{
    fetchMenuGroups()
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
          reject(new Error(`Waiting for module timeout: ${moduleName}`))
        }
      }
    }, checkInterval)
  })
}

// fetchMenuGroups
const fetchMenuGroups = async () => {
  const moduleName = vuexModule.name
  try {
    // Wait for the module to load
    await waitForModule(moduleName)
    
    // Now that the module is loaded, it is safe to call dispatch
    await store.dispatch(`${moduleName}/fetchMenuGroups`)
    
  } catch (error) {
    console.error(`Waiting or loading failed: ${error.message}`)
    throw error
  }
}
</script>