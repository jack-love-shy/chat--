import { createStore } from 'vuex'

const modulesFiles = import.meta.globEager('./modules/*.js')
const modules = Object.keys(modulesFiles).reduce((modules, path) => {
  // 从./modules/userStore.js中获得 userStore
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = modulesFiles[path].default
  return modules
}, {})

export default createStore({
  modules
})
