import { createApp } from 'vue'
import router from './router/router.js'
import store from './store'
import App from './App.vue'
import 'animate.css/animate.min.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 设置全局组件
// app.component("Show",Show);
// 为app实例挂着路由对象
app.directive('focus', {
  mounted (el) {
    el.focus()
  }
})

app.use(store)
app.use(router)
app.mount('#app')
app.use(ElementPlus)
