// Automatically generated Vue component - PreferencesView.vue
// Generation time: 2025-11-19 15:24:52
// modules: [{'extent': 'session', 'fields': {'settingId': 'number', 'settingName': 'string', 'settingIntroduce': 'string'}, 'name': 'GeneralSettings', 'singular': 'GeneralSetting', 'fetch_action': 'fetchGeneralSetting', 'skip_if_exists': True}]

<!-- Add component UI code here -->

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

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'

// Defining Interface

interface GeneralSettings {
    
    settingId: number, 
    
    settingName: string, 
    
    settingIntroduce: string
    
}


// Module configuration (defined in setup)
const vuexModules = [
    
    {
        name: 'GeneralSettings',
        extent: 'session'
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


// Load all module data on mount
onMounted(() => {
    fetchAllModules()
})

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
</script>