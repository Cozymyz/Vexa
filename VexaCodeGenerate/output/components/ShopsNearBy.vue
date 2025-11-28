// Automatically generated Vue component - ShopsNearBy.vue
// Generation time: 2025-11-19 15:24:52
// modules: [{'extent': 'session', 'fields': {'settingId': 'number', 'settingName': 'string', 'settingIntroduce': 'string'}, 'name': 'GeneralSettings', 'singular': 'GeneralSetting', 'fetch_action': 'fetchGeneralSetting', 'skip_if_exists': True}, {'extent': 'component', 'fields': {'shopId': 'number', 'shopName': 'string', 'shopIntroduce': 'string'}, 'name': 'ShopList', 'singular': 'ShopList', 'fetch_action': 'fetchShopList', 'skip_if_exists': False}, {'extent': 'component', 'fields': {'genreId': 'number', 'genreName': 'string', 'genreIntroduce': 'string'}, 'name': 'GenreList', 'singular': 'GenreList', 'fetch_action': 'fetchGenreList', 'skip_if_exists': False}, {'extent': 'component', 'fields': {'userlocationId': 'number', 'userlocationName': 'string', 'userlocationIntroduce': 'string'}, 'name': 'UserLocation', 'singular': 'UserLocation', 'fetch_action': 'fetchUserLocation', 'skip_if_exists': False}]

<template>
<!-- Add component UI code here -->
</template>

<script lang="ts">
// Module configuration (exposed to vuexLazyLoad plugin)
export default {
  vuexModule: [
    
    {
        name: 'GeneralSettings',
        extent: 'session'
    },
    
    {
        name: 'ShopList',
        extent: 'component'
    },
    
    {
        name: 'GenreList',
        extent: 'component'
    },
    
    {
        name: 'UserLocation',
        extent: 'component'
    }
    
  ]
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

// Defining Interface

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

interface GenreList {
    
    genreId: number, 
    
    genreName: string, 
    
    genreIntroduce: string
    
}

interface UserLocation {
    
    userlocationId: number, 
    
    userlocationName: string, 
    
    userlocationIntroduce: string
    
}


// Module configuration (defined in setup)
const vuexModules = [
    
    {
        name: 'GeneralSettings',
        extent: 'session'
    },
    
    {
        name: 'ShopList',
        extent: 'component'
    },
    
    {
        name: 'GenreList',
        extent: 'component'
    },
    
    {
        name: 'UserLocation',
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

const fetchGeneralSetting = async (skipIfExists = true) => {
    const moduleName = 'GeneralSettings'
    // Skip existing modules
    if (store.hasModule(moduleName)) {
        if (skipIfExists) {
            return { success: true, skipped: true, reason: 'The module already exists' }
        }
    }
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchGeneralSetting`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchShopList = async (skipIfExists = false) => {
    const moduleName = 'ShopList'
    // Skip existing modules
    if (store.hasModule(moduleName)) {
        if (skipIfExists) {
            return { success: true, skipped: true, reason: 'The module already exists' }
        }
    }
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchShopList`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchGenreList = async (skipIfExists = false) => {
    const moduleName = 'GenreList'
    // Skip existing modules
    if (store.hasModule(moduleName)) {
        if (skipIfExists) {
            return { success: true, skipped: true, reason: 'The module already exists' }
        }
    }
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchGenreList`)
    } catch (error) {
        console.error(`Error loading module ${moduleName}: ${error.message}`)
        throw error
    }
}

const fetchUserLocation = async (skipIfExists = false) => {
    const moduleName = 'UserLocation'
    // Skip existing modules
    if (store.hasModule(moduleName)) {
        if (skipIfExists) {
            return { success: true, skipped: true, reason: 'The module already exists' }
        }
    }
    try {
        await waitForModule(moduleName)
        await store.dispatch(`${moduleName}/fetchUserLocation`)
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
            
            fetchGeneralSetting(),
            
            fetchShopList(),
            
            fetchGenreList(),
            
            fetchUserLocation()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}
</script>