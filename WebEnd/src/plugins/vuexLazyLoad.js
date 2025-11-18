/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 20:47:25
 * @LastEditTime: 2025-11-19 00:10:16
 * @Description: 
 */
function vuexLazyLoad(app) {
  app.mixin({
    async mounted() {
      // Get the Vuex module in the component configuration
      const vuexModules = this.$_getVuexModules()

      //If there is no module configuration, it will be returned directly.
      if (!vuexModules || vuexModules.length === 0) return

      //Register all modules
      await this.$_registerAllModules(vuexModules)
    },

    beforeUnmount() {
      // Get the Vuex module in the component configuration
      const vuexModules = this.$_getVuexModules()
      
      // 没f there is no module configuration, it will be returned directly.
      if (!vuexModules || vuexModules.length === 0) return
      
      // Uninstall all eligible modules
      this.$_unregisterAllModules(vuexModules)
    },

    methods: {
      // Get the Vuex module in the component configuration
      $_getVuexModules() {
        const { vuexModule } = this.$options
        // Handles single-module and multi-module configurations
        if (!vuexModule) return []
        if (Array.isArray(vuexModule)) return vuexModule
        return [vuexModule]
      },

      // Register all modules
      async $_registerAllModules(modules){
        // Process all modules in parallel
        await Promise.all(modules.map(module => {
          // Only if the module name exists and has not been registered
          if (module && module.name && !this.$store.hasModule(module.name)) {
            return this.$_registerVuexModule(module)
          }
          return Promise.resolve()
        }))
      },

      // Register single module
      async $_registerVuexModule(moduleConfig){
        const { name: moduleName, extent } = moduleConfig

        try {
          // Dynamically loading modules
          const module = await import(/* @vite-ignore */ `../store/modules/${moduleName}.js`)
          
          // Register module
          this.$store.registerModule(moduleName, module.default)
          
          // Setting module lifecycle
          console.log(`Setting module lifecycle: ${moduleName}，${extent}`)
          this.$_setupModuleLifecycle(moduleName, extent)
          
          console.log(`The module was successfully loaded and registered: ${moduleName}`)
        } catch (error) {
          console.error(`Load ${moduleName} failed:`, error)
        }
      },

      // Setting up module lifecycle management
      $_setupModuleLifecycle(moduleName, extent){
        // Record the cleanup function of the current component
        if (!this.$_cleanupFunctions) {
          this.$_cleanupFunctions = []
        }

        switch (extent) {
          case 'session':
            const sessionCleanup = () => {
              if (this.$store.hasModule(moduleName)) {
                this.$store.unregisterModule(moduleName)
                console.log(`Session closed: ${moduleName} has been unloaded`)
              }
            }
            
            window.addEventListener('beforeunload', sessionCleanup);
            
            // Stores cleanup functions for removal when the component is unmounted
            this.$_cleanupFunctions.push(() => {
              window.removeEventListener('beforeunload', sessionCleanup)
              console.log(`Removed session listener for ${moduleName}`)
            });
            
            break;
            
          case 'timeLimit':
            const timer = setTimeout(() => {
              if (this.$store.hasModule(moduleName)) {
                this.$store.unregisterModule(moduleName)
                console.log(`Time limited: ${moduleName} has been unloaded`)
              }
            }, 10000)//set the limit time
            
            this.$_cleanupFunctions.push(() => {
              clearTimeout(timer)
              console.log(`Timer cleared for ${moduleName}`)
            })
            
            break
            
          case 'component':
            // Component level module - no additional processing is required, it will be unmounted in beforeUnmount
            break
            
          default:
            console.warn(`Unknow type: "${extent}" (${moduleName})`)
        }
      },

      // Unregister all eligible modules
      $_unregisterAllModules(modules){
        modules.forEach(module => {
          if (module && module.name){
            this.$_unregisterVuexModule(module.name, module.extent)
          }
        })

        // Execute all cleanup functions
        if (this.$_cleanupFunctions) {
          this.$_cleanupFunctions.forEach(fn => fn())
          this.$_cleanupFunctions = []
        }
      },

      //Unregister single module
      $_unregisterVuexModule(moduleName, extent = null){
        // Unregister only if module exists 
        if (!this.$store.hasModule(moduleName)) return

        // Processing by 'extent'
        switch (extent) {
          case 'session':
          case 'timeLimit':
            // These types have their own lifecycle management and do not need to be uninstalled here
            break
            
          case 'component':
            // Unregister component-level modules
            this.$store.unregisterModule(moduleName)
            console.log(`Component-level: ${moduleName} has been unloaded`)
            break
            
          default:
            // Unregister default modules
            this.$store.unregisterModule(moduleName)
            console.log(`Default-level: ${moduleName} has been unloaded`)
            break
        }
      }
    }
  })
}

export default vuexLazyLoad