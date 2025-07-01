// Automatically generated Vue component - UserProfile.vue
// Generation time: 2025-07-01 16:05:23
// modules: [{'name': 'User', 'extent': 'local', 'fields': {'userId': 'number', 'username': 'string', 'email': 'string'}, 'singular': 'User', 'plural': 'Users', 'fetch_action': 'fetchUsers'}]

<template>
<!-- Add component UI code here -->
</template>

<script lang="ts">
// Module configuration (exposed to vuexLazyLoad plugin)
export default {
  vuexModule: [
    
    {
        name: 'User',
        extent: 'local'
    }
    
  ]
}
</script>

<script setup lang="ts">
import { onMounted, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'

// Defining Interface

interface User {
    
    userId: number, 
    
    username: string, 
    
    email: string
    
}


// Module configuration (defined in setup)
const vuexModules = [
    
    {
        name: 'User',
        extent: 'local'
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
    const moduleName = 'User'
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
            
            fetchUsers()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}
</script>