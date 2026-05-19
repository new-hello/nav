import { ref, watch, onMounted } from 'vue'
import { useLocalStorage } from './useLocalStorage'

/**
 * Theme management composable
 * 管理深色/浅色主题切换和持久化
 */
export function useTheme() {
  const storage = useLocalStorage()
  const theme = ref('light')
  
  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  const initTheme = () => {
    // 1. 尝试从 LocalStorage 读取
    const saved = storage.get('nav_theme')
    if (saved?.mode) {
      theme.value = saved.mode
    } else {
      // 2. 检测系统主题
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme()
  }
  
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
  }
  
  // 监听主题变化并持久化
  watch(theme, (newTheme) => {
    applyTheme()
    storage.set('nav_theme', { mode: newTheme, auto: false })
  })
  
  // 监听系统主题变化
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', (e) => {
      const saved = storage.get('nav_theme')
      if (!saved || saved.auto) {
        theme.value = e.matches ? 'dark' : 'light'
      }
    })
  })
  
  return {
    theme,
    toggleTheme,
    setTheme,
    initTheme
  }
}
