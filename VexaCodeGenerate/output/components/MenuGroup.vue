// Automatically generated Vue component - MenuGroup.vue
// Generation time: 2025-07-01 16:05:23
// modules: [{'name': 'MenuGroup', 'extent': 'session', 'fields': {'groupId': 'number', 'groupName': 'string', 'displayOrder': 'number'}, 'singular': 'MenuGroup', 'plural': 'MenuGroups', 'fetch_action': 'fetchMenuGroups'}, {'name': 'Test', 'extent': 'session', 'fields': {'testId': 'number', 'testName': 'string', 'displayOrder': 'number'}, 'singular': 'Test', 'plural': 'Tests', 'fetch_action': 'fetchTests'}]

<template>
<!-- Add component UI code here -->
</template>

<script lang="ts">
// Module configuration (exposed to vuexLazyLoad plugin)
export default {
  vuexModule: [
    
    {
        name: 'MenuGroup',
        extent: 'session'
    },
    
    {
        name: 'Test',
        extent: 'session'
    }
    
  ]
}
</script>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

// Defining Interface

interface MenuGroup {
    
    groupId: number, 
    
    groupName: string, 
    
    displayOrder: number
    
}

interface Test {
    
    testId: number, 
    
    testName: string, 
    
    displayOrder: number
    
}


// Module configuration (defined in setup)
const vuexModules = [
    
    {
        name: 'MenuGroup',
        extent: 'session'
    },
    
    {
        name: 'Test',
        extent: 'session'
    }
    
]

// Mount module configuration to component instance type (for global plugin access)
const instance = getCurrentInstance();
if (instance && instance.type) {
  instance.type.vuexModule = vuexModules;
}

const store = useStore()

// Generic function to wait for a module to load
const waitForModule = (moduleName: string, timeout = 2000) => {
    return new Promise<void>((resolve, reject) => {
        const checkInterval = 50 // check every 50ms
        let elapsed = 0

        const interval = setInterval(() => {
            if (store.hasModule(moduleName)) {
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

// Create fetch functions for each module

const  = async () => {
    const moduleName = 'MenuGroup'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const  = async () => {
    const moduleName = 'Test'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}


// Load all module data on mount
onMounted(() => {
    fetchAllModules()
})

// Get all module data in parallel
const fetchAllModules = async () => {
    try {
        await Promise.all([
            
            fetchMenuGroups(),
            
            fetchTests()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}
</script>