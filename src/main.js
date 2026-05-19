import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { useTheme } from './composables/useTheme'

// 初始化主题
const { initTheme } = useTheme()
initTheme()

const app = createApp(App)

app.use(router)

app.mount('#app')
