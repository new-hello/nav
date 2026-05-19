/**
 * 数据验证服务
 * 提供各种数据格式的验证功能
 */

/**
 * 验证导航标签数据
 * @param {Object} tag - 导航标签对象
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateNavigationTag(tag) {
  // 验证标签对象
  if (!tag || typeof tag !== 'object') {
    return { valid: false, error: '标签数据格式无效' }
  }
  
  // 验证名称
  if (!tag.name || typeof tag.name !== 'string') {
    return { valid: false, error: '标签名称不能为空' }
  }
  
  if (tag.name.trim().length === 0) {
    return { valid: false, error: '标签名称不能为空' }
  }
  
  if (tag.name.length > 50) {
    return { valid: false, error: '标签名称不能超过50个字符' }
  }
  
  // 验证 URL
  if (!tag.url || typeof tag.url !== 'string') {
    return { valid: false, error: 'URL 不能为空' }
  }
  
  try {
    new URL(tag.url)
  } catch {
    return { valid: false, error: 'URL 格式无效' }
  }
  
  // 验证图标（可选）
  if (tag.icon !== undefined && tag.icon !== null && tag.icon !== '') {
    if (typeof tag.icon !== 'string') {
      return { valid: false, error: '图标必须是字符串类型' }
    }
    
    // 如果不是 base64 或本地路径，验证是否为有效 URL
    if (!tag.icon.startsWith('data:image/') && !tag.icon.startsWith('/')) {
      try {
        new URL(tag.icon)
      } catch {
        return { valid: false, error: '图标 URL 格式无效' }
      }
    }
  }
  
  return { valid: true }
}

/**
 * 验证导入的配置文件
 * @param {File} file - 文件对象
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateImportFile(file) {
  // 验证文件类型
  if (!file.type || file.type !== 'application/json') {
    return { valid: false, error: '只支持 JSON 格式文件' }
  }
  
  // 验证文件大小（最大 5MB）
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return { valid: false, error: '文件大小不能超过 5MB' }
  }
  
  if (file.size === 0) {
    return { valid: false, error: '文件不能为空' }
  }
  
  return { valid: true }
}

/**
 * 验证背景图片文件
 * @param {File} file - 文件对象
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateBackgroundFile(file) {
  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!file.type || !validTypes.includes(file.type)) {
    return { valid: false, error: '只支持 JPG、PNG、GIF、WEBP 格式的图片' }
  }
  
  // 验证文件大小（最大 5MB）
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return { valid: false, error: '图片大小不能超过 5MB' }
  }
  
  if (file.size === 0) {
    return { valid: false, error: '文件不能为空' }
  }
  
  return { valid: true }
}

/**
 * 验证 URL 格式
 * @param {string} url - URL 字符串
 * @returns {boolean}
 */
export function validateUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证配置文件内容
 * @param {Object} config - 配置对象
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateConfigContent(config) {
  if (!config || typeof config !== 'object') {
    return { valid: false, error: '配置文件格式无效' }
  }
  
  if (!config.version) {
    return { valid: false, error: '配置文件缺少版本信息' }
  }
  
  if (!Array.isArray(config.tags)) {
    return { valid: false, error: '配置文件缺少标签数组' }
  }
  
  // 验证每个标签
  for (let i = 0; i < config.tags.length; i++) {
    const validation = validateNavigationTag(config.tags[i])
    if (!validation.valid) {
      return { 
        valid: false, 
        error: `标签 ${i + 1} 验证失败: ${validation.error}` 
      }
    }
  }
  
  return { valid: true }
}
