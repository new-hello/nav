import { ref, onMounted, onUnmounted } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import { fileToBase64 } from '@/utils/fileUtils'
import { validateBackgroundFile } from '@/services/validators'

/**
 * Background customization composable
 * 管理背景图片的 URL 和文件上传
 */
export function useBackground() {
  const storage = useLocalStorage()
  const background = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  // 加载背景
  const loadBackground = () => {
    const saved = storage.get('nav_background')
    if (saved?.value) {
      background.value = saved.value
    } else {
      background.value = null
    }
  }
  
  // 监听 storage 变化（跨组件同步）
  const handleStorageChange = (e) => {
    if (e.key === 'nav_background') {
      loadBackground()
    }
  }
  
  // URL 验证
  const validateUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }
  
  // 设置 URL 背景
  const setBackgroundUrl = async (url) => {
    if (!validateUrl(url)) {
      error.value = '无效的 URL 格式'
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      // 预加载图片验证
      await new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = url
      })
      
      background.value = url
      storage.set('nav_background', {
        type: 'url',
        value: url,
        updatedAt: new Date().toISOString()
      })
      
      // 触发自定义事件通知其他组件
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'nav_background',
        newValue: JSON.stringify({ type: 'url', value: url })
      }))
    } catch (e) {
      error.value = '图片加载失败，请检查 URL'
    } finally {
      loading.value = false
    }
  }
  
  // 设置文件背景
  const setBackgroundFile = async (file) => {
    const validation = validateBackgroundFile(file)
    if (!validation.valid) {
      error.value = validation.error
      return
    }
    
    loading.value = true
    error.value = null
    
    try {
      const base64 = await fileToBase64(file)
      background.value = base64
      storage.set('nav_background', {
        type: 'file',
        value: base64,
        updatedAt: new Date().toISOString()
      })
      
      // 触发自定义事件通知其他组件
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'nav_background',
        newValue: JSON.stringify({ type: 'file', value: base64 })
      }))
    } catch (e) {
      error.value = '文件处理失败'
    } finally {
      loading.value = false
    }
  }
  
  // 移除背景
  const removeBackground = () => {
    background.value = null
    storage.remove('nav_background')
    error.value = null
    
    // 触发自定义事件通知其他组件
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'nav_background',
      newValue: null
    }))
  }
  
  // 初始化加载
  loadBackground()
  
  // 组件挂载时添加监听器
  onMounted(() => {
    window.addEventListener('storage', handleStorageChange)
  })
  
  // 组件卸载时移除监听器
  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
  })
  
  return {
    background,
    setBackgroundUrl,
    setBackgroundFile,
    removeBackground,
    validateUrl,
    loading,
    error
  }
}
