import { ref } from 'vue'
import storageService from '@/services/storageService'

/**
 * LocalStorage composable
 * 封装 StorageService 为响应式接口
 */
export function useLocalStorage() {
  const quotaExceeded = ref(false)
  
  const get = (key, defaultValue) => {
    return storageService.get(key, defaultValue)
  }
  
  const set = (key, value) => {
    const success = storageService.set(key, value)
    if (!success) {
      quotaExceeded.value = true
    }
    return success
  }
  
  const remove = (key) => {
    storageService.remove(key)
  }
  
  const clear = () => {
    storageService.clear()
  }
  
  const getUsage = () => {
    return storageService.getUsage()
  }
  
  return {
    get,
    set,
    remove,
    clear,
    getUsage,
    quotaExceeded
  }
}
