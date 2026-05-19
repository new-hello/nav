import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLocalStorage } from './useLocalStorage'
import systemNavigationConfig from '@/config/systemNavigation.json'

/**
 * System navigation management composable
 * 管理系统导航的分类、二级分类和标签
 * 支持从 LocalStorage 加载自定义配置
 */
export function useSystemNavigation() {
  const route = useRoute()
  const storage = useLocalStorage()
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  // 加载系统导航配置
  const loadConfig = () => {
    loading.value = true
    error.value = null
    
    try {
      if (!systemNavigationConfig || !systemNavigationConfig.categories) {
        throw new Error('系统导航配置格式无效')
      }
      categories.value = systemNavigationConfig.categories
    } catch (e) {
      error.value = e.message
      categories.value = []
    } finally {
      loading.value = false
    }
  }
  
  // 保存配置到 LocalStorage
  const saveConfig = (newCategories) => {
    try {
      storage.set('system_navigation', {
        version: '1.0',
        categories: newCategories
      })
      categories.value = newCategories
      return true
    } catch (e) {
      error.value = '保存失败：' + e.message
      return false
    }
  }
  
  // 重置为默认配置
  const resetToDefault = () => {
    try {
      storage.remove('system_navigation')
      categories.value = systemNavigationConfig.categories
      return true
    } catch (e) {
      error.value = '重置失败：' + e.message
      return false
    }
  }
  
  // 监听路由变化，重新加载配置
  watch(() => route.path, () => {
    loadConfig()
  })
  
  onMounted(() => {
    loadConfig()
  })
  
  return {
    categories,
    loading,
    error,
    saveConfig,
    resetToDefault,
    loadConfig
  }
}
