/**
 * StorageService - LocalStorage 封装服务
 * 提供类型安全的存储操作和配额管理
 */
export class StorageService {
  constructor(storage = window.localStorage) {
    this.storage = storage
  }
  
  /**
   * 获取存储的值
   * @param {string} key - 存储键
   * @param {*} defaultValue - 默认值
   * @returns {*} 存储的值或默认值
   */
  get(key, defaultValue = null) {
    try {
      const item = this.storage.getItem(key)
      if (item === null) return defaultValue
      return JSON.parse(item)
    } catch (error) {
      console.error(`Failed to get item from storage: ${key}`, error)
      return defaultValue
    }
  }
  
  /**
   * 设置存储的值
   * @param {string} key - 存储键
   * @param {*} value - 要存储的值
   * @returns {boolean} 是否成功
   */
  set(key, value) {
    try {
      const serialized = JSON.stringify(value)
      this.storage.setItem(key, serialized)
      return true
    } catch (error) {
      if (this.isQuotaExceeded(error)) {
        console.error('LocalStorage quota exceeded')
        return false
      }
      console.error(`Failed to set item in storage: ${key}`, error)
      return false
    }
  }
  
  /**
   * 删除存储的值
   * @param {string} key - 存储键
   */
  remove(key) {
    try {
      this.storage.removeItem(key)
    } catch (error) {
      console.error(`Failed to remove item from storage: ${key}`, error)
    }
  }
  
  /**
   * 清空所有存储
   */
  clear() {
    try {
      this.storage.clear()
    } catch (error) {
      console.error('Failed to clear storage', error)
    }
  }
  
  /**
   * 检查是否超出配额
   * @param {Error} error - 错误对象
   * @returns {boolean}
   */
  isQuotaExceeded(error) {
    return (
      error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    )
  }
  
  /**
   * 获取存储使用情况
   * @returns {Object} 使用情况统计
   */
  getUsage() {
    let total = 0
    const details = {}
    
    for (let key in this.storage) {
      if (this.storage.hasOwnProperty(key)) {
        const size = (this.storage[key].length + key.length) * 2 // UTF-16
        details[key] = size
        total += size
      }
    }
    
    return {
      total,
      totalMB: (total / 1024 / 1024).toFixed(2),
      details
    }
  }
}

// 导出单例实例
export default new StorageService()

// 存储键常量
export const STORAGE_KEYS = {
  USER_NAVIGATION: 'nav_user_tags',
  THEME: 'nav_theme',
  BACKGROUND: 'nav_background',
  SELECTED_ENGINE: 'nav_selected_engine'
}
