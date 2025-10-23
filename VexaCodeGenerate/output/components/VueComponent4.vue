// Automatically generated Vue component - VueComponent4.vue
// Generation time: 2025-10-23 16:44:37
// modules: [{'name': 'VuexModule1', 'extent': 'session', 'fields': {'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}, 'singular': 'VuexModule1', 'plural': 'VuexModule1s', 'fetch_action': 'fetchVuexModule1s'}, {'name': 'VuexModule2', 'extent': 'component', 'fields': {'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}, 'singular': 'VuexModule2', 'plural': 'VuexModule2s', 'fetch_action': 'fetchVuexModule2s'}, {'name': 'VuexModule3', 'extent': 'component', 'fields': {'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}, 'singular': 'VuexModule3', 'plural': 'VuexModule3s', 'fetch_action': 'fetchVuexModule3s'}, {'name': 'VuexModule4', 'extent': 'component', 'fields': {'userId': 'number', 'userName': 'string', 'userPassword': 'string', 'userIntroduce': 'string'}, 'singular': 'VuexModule4', 'plural': 'VuexModule4s', 'fetch_action': 'fetchVuexModule4s'}]

<template>
<!-- Add component UI code here -->
</template>

<script lang="ts">
// Module configuration (exposed to vuexLazyLoad plugin)
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
import { onMounted } from 'vue'
import { useStore } from 'vuex'

// Defining Interface

interface VuexModule1 {
    
    userId: number, 
    
    userName: string, 
    
    userPassword: string, 
    
    userIntroduce: string
    
}

interface VuexModule2 {
    
    userId: number, 
    
    userName: string, 
    
    userPassword: string, 
    
    userIntroduce: string
    
}

interface VuexModule3 {
    
    userId: number, 
    
    userName: string, 
    
    userPassword: string, 
    
    userIntroduce: string
    
}

interface VuexModule4 {
    
    userId: number, 
    
    userName: string, 
    
    userPassword: string, 
    
    userIntroduce: string
    
}


// Module configuration (defined in setup)
const vuexModules = [
    
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

const fetchVuexModule1s = async () => {
    const moduleName = 'VuexModule1'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchVuexModule1s`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchVuexModule2s = async () => {
    const moduleName = 'VuexModule2'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchVuexModule2s`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchVuexModule3s = async () => {
    const moduleName = 'VuexModule3'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchVuexModule3s`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchVuexModule4s = async () => {
    const moduleName = 'VuexModule4'
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchVuexModule4s`)
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
            
            fetchVuexModule1s(),
            
            fetchVuexModule2s(),
            
            fetchVuexModule3s(),
            
            fetchVuexModule4s()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}
</script>