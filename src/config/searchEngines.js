/**
 * 搜索引擎配置
 * 定义所有可用的搜索引擎及其 URL 模板
 */
export default [
  {
    id: 'bing',
    name: 'Bing',
    urlTemplate: 'https://www.bing.com/search?q={query}',
    icon: "/icons/Search/Bing.svg",
    default: true
  },
  {
    id: 'google',
    name: 'Google',
    urlTemplate: 'https://www.google.com/search?q={query}',
    icon: "/icons/Search/Google.svg"
  },
  {
    id: 'baidu',
    name: '百度',
    urlTemplate: 'https://www.baidu.com/s?wd={query}',
    icon: "/icons/Search/百度.svg"
  }
]
