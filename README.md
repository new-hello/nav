# 导航页面

预览链接：nav.5211334.xyz

一个简洁美观的个人导航页面，基于 Vue 3 + Tailwind CSS 构建。

## 功能特性

- 🎯 **分类导航** - 支持多级分类，清晰展示各类网站
- 🔍 **搜索功能** - 集成多搜索引擎，快速搜索
- 🌙 **暗色模式** - 自动跟随系统，一键切换
- 🎨 **自定义背景** - 支持设置个性化背景图片
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 💾 **本地存储** - 自定义导航数据保存在本地

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vue Router** - 官方路由管理器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vite** - 下一代前端构建工具

## 快速开始

### 环境要求

- Node.js `^20.19.0` 或 `>=22.12.0`

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
├── public/                 # 静态资源
│   └── icons/             # 网站图标
├── src/
│   ├── components/        # Vue 组件
│   │   ├── atoms/         # 基础组件
│   │   ├── molecules/     # 组合组件
│   │   └── organisms/     # 页面组件
│   ├── composables/       # 组合式函数
│   ├── config/            # 配置文件
│   ├── router/            # 路由配置
│   ├── views/             # 页面视图
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── postcss.config.js      # PostCSS 配置
└── vite.config.js         # Vite 配置
```

## 自定义配置

### 添加导航链接

编辑 `src/config/systemNavigation.json` 文件，按照以下格式添加：

```json
{
  "categories": [
    {
      "name": "分类名称",
      "subcategories": [
        {
          "name": "子分类名称",
          "tags": [
            {
              "name": "网站名称",
              "url": "https://example.com",
              "icon": "/icons/category/subcategory/icon.png"
            }
          ]
        }
      ]
    }
  ]
}
```

### 添加图标

将图标文件放入 `public/icons/` 目录下，并在配置文件中指定路径。

## 免责声明

本页面提供的链接仅供参考，不构成任何形式的推荐或背书。请用户自行判断相关网站内容的真实性和安全性。

## 许可证

MIT License
