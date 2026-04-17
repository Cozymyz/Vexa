// GENERATED_CONTENT_START:component_header
// Automatically generated Vue component - PreferencesView.vue
// Generation time: 2026-04-07 11:54:27
// WARNING: Do not modify the content inside GENERATED_CONTENT blocks.
// modules: [{'extent': 'session', 'fields': {'settingId': 'number', 'settingName': 'string', 'settingIntroduce': 'string', 'settingOrd': 'numer'}, 'name': 'GeneralSettings', 'singular': 'GeneralSetting', 'fetch_action': 'fetchGeneralSetting', 'skip_if_exists': True}]
// GENERATED_CONTENT_END:component_header

<template>
<!-- Add component UI code here -->
</template>

// GENERATED_CONTENT_START:module_config_export
<script lang="ts">
// Module configuration (exposed to vuexLazyLoad plugin)
export default {
  vuexModule: [
    
    {
        name: 'GeneralSettings',
        extent: 'session'
    }
    
  ]
}
</script>
// GENERATED_CONTENT_END:module_config_export

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

// GENERATED_CONTENT_START:typescript_interfaces
// Defining Interface

interface GeneralSettings {
    
    settingId: number, 
    
    settingName: string, 
    
    settingIntroduce: string, 
    
    settingOrd: numer
    
}

// GENERATED_CONTENT_END:typescript_interfaces

// GENERATED_CONTENT_START:vuex_modules_config
// Module configuration (defined in setup)
const vuexModules = [
    
    {
        name: 'GeneralSettings',
        extent: 'session'
    }
    
]
// GENERATED_CONTENT_END:vuex_modules_config

const store = useStore()

// GENERATED_CONTENT_START:wait_for_module_function
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
// GENERATED_CONTENT_END:wait_for_module_function

// GENERATED_CONTENT_START:module_fetch_functions
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

// GENERATED_CONTENT_END:module_fetch_functions

// GENERATED_CONTENT_START:onmounted_hook
// Load all module data on mount
onMounted(() => {
    fetchAllModules()
})
// GENERATED_CONTENT_END:onmounted_hook

// GENERATED_CONTENT_START:fetch_all_function
// Get all module data in parallel
const fetchAllModules = async () => {
    try {
        await Promise.all([
            
            fetchGeneralSetting()
            
        ])
        console.log('All modules data loaded successfully')
    } catch (error) {
        console.error('Error loading one or more modules:', error)
    }
}
// GENERATED_CONTENT_END:fetch_all_function

</script>