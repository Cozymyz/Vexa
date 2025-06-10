/*
 * @Author: Meiyizhi
 * @Date: 2025-06-10 20:47:25
 * @LastEditTime: 2025-06-10 22:04:42
 * @Description: 
 */
function vuexLazyLoad(app) {
  app.mixin({
    beforeMount() {
      const vuexModule = this.$options.vuexModule;
      if (vuexModule && vuexModule.name) {
        const vuexModuleName = vuexModule.name;
        if (!this.$store.hasModule(vuexModuleName)) {
          import(/* @vite-ignore */ `../store/modules/${vuexModuleName}.js`)
            .then(module => {
                console.log("Loaded module:", module)
              this.$store.registerModule(vuexModuleName, module.default);
            })
            .catch(error => {
              console.error(`Failed to load module ${vuexModuleName}:`, error);
            });

          switch (vuexModule.extent) {
            case 'session':
              window.addEventListener('beforeunload', () => {
                if (this.$store.hasModule(vuexModuleName)) {
                  this.$store.unregisterModule(vuexModuleName);
                  console.log(`Module "${vuexModuleName}" unregistered on session end.`);
                }
              });
              break;
            case 'timeLimit':
              setTimeout(() => {
                if (this.$store.hasModule(vuexModuleName)) {
                  this.$store.unregisterModule(vuexModuleName);
                  console.log(`Module "${vuexModuleName}" unregistered on time limit.`);
                }
              }, 10000);
              break;
            default:
              console.warn(`Unknown extent type "${vuexModule.extent}" for module "${vuexModuleName}".`);
          }
        }
      }
    },
    beforeUnmount() {
      const vuexModule = this.$options.vuexModule;
      if (vuexModule && vuexModule.name) {
        const vuexModuleName = vuexModule.name;
        if (this.$store.hasModule(vuexModuleName)) {
          switch (vuexModule.extent) {
            case 'session':
              break;
            case 'component':
              this.$store.unregisterModule(vuexModuleName);
              console.log(`Unregistering module "${vuexModuleName}" on component unmount.`);
              break;
            case 'timeLimit':
              break;
            default:
              console.warn(`Unknown extent type "${vuexModule.extent}" for module "${vuexModuleName}".`);
              this.$store.unregisterModule(vuexModuleName);
          }
        }
      }
    }
  })
}

export default vuexLazyLoad