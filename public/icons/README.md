# 图标文件夹结构说明

## 📁 目录结构

本目录包含了所有导航标签的图标文件，按照一级分类和二级分类组织：

```
icons-new/
├── AITools/              # AI工具
│   ├── Chat/            # 对话
│   ├── Coding/          # 编程
│   ├── Image/           # 图像
│   └── Video/           # 视频
├── Development/          # 开发设计
│   ├── CodeHosting/     # 代码托管
│   ├── DevTools/        # 开发工具
│   ├── DevDocs/         # 开发文档
│   ├── DesignTools/     # 设计工具
│   └── DesignResources/ # 设计资源
├── Entertainment/        # 影音娱乐
│   ├── Video/           # 视频
│   ├── ShortVideo/      # 短视频
│   ├── Live/            # 直播
│   └── Music/           # 音乐
├── Game/                 # 游戏
│   ├── Platform/        # 平台
│   └── MobileGame/      # 手游
├── LifeTools/            # 生活工具
│   ├── Social/          # 社交
│   ├── Office/          # 办公
│   ├── Email/           # 邮箱
│   ├── Map/             # 地图
│   ├── Travel/          # 出行
│   └── Food/            # 外卖
├── News/                 # 资讯
│   ├── General/         # 综合
│   ├── Tech/            # 科技
│   ├── Finance/         # 财经
│   ├── Sports/          # 体育
│   └── Entertainment/   # 娱乐
├── OfficeStudy/          # 办公学习
│   ├── Document/        # 文档
│   ├── Tools/           # 工具
│   ├── CloudStorage/    # 网盘
│   └── Learning/        # 学习
├── Search/               # 搜索（无子分类）
└── Shopping/             # 购物
    ├── General/         # 综合
    ├── SecondHand/      # 二手
    └── Overseas/        # 海外
```

## 📊 统计信息

- **总文件数**: 291 个图标文件
- **一级分类**: 9 个
- **二级分类**: 33 个

## 🔧 使用说明

### 1. 替换图标文件

当前所有的 `.png` 文件都是 1x1 透明占位图。你需要：

1. 找到对应标签的真实图标
2. 将图标文件重命名为对应的文件名（如 `QQ.png`）
3. 替换到对应的文件夹中

### 2. 查看路径映射

`icon-mapping.json` 文件包含了所有标签的详细信息：

```json
[
  {
    "name": "QQ",
    "url": "https://im.qq.com/",
    "iconPath": "/icons-new/LifeTools/Social/QQ.png",
    "category": "生活工具",
    "subcategory": "社交"
  },
  ...
]
```

### 3. 批量更新配置

替换完图标后，可以使用脚本批量更新配置文件中的 `icon` 路径。

## 📝 文件命名规则

- 文件名与标签名称一致
- 特殊字符已被移除
- 所有文件扩展名为 `.png`
- 支持中英文混合命名

## 🎨 图标规格建议

- **格式**: PNG（支持透明背景）
- **尺寸**: 建议 64x64 或 128x128 像素
- **背景**: 透明或纯色
- **风格**: 保持统一的视觉风格

## 🔄 更新流程

1. 准备好所有图标文件
2. 按照文件夹结构放置图标
3. 运行更新脚本（如果需要）
4. 在浏览器中预览效果

## ⚠️ 注意事项

- 确保图标文件名与配置文件中的标签名称完全一致
- 建议使用 PNG 格式以支持透明背景
- 图标尺寸保持一致，避免显示不协调
- 文件大小建议控制在 50KB 以内，优化加载速度
