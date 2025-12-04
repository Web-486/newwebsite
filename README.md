# IAA协会主页

IAA协会主页是一个基于Vue 3的现代化协会网站，展示协会信息、成员介绍、活动动态以及提供互动功能。

## 项目简介

本项目是IAA协会的官方网站，旨在展示协会文化、成员风采、活动动态，并为会员和访客提供互动平台。网站采用响应式设计，适配各种设备屏幕尺寸。

## 技术栈

### 前端
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **Element Plus** - 基于Vue 3的UI组件库
- **Axios** - HTTP客户端

### 后端
- **Express** - Node.js Web应用框架
- **Socket.IO** - 实时通信库

## 功能介绍

1. **首页** - 展示协会简介、最新动态和特色内容
2. **关于我们** - 协会介绍、团队成员展示
3. **活动中心** - 活动列表、活动详情、日期选择器
4. **青春梦想** - 互动留言墙、实时消息功能

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
# 启动前端开发服务器
npm run dev

# 启动后端服务器（支持WebSocket）
npm run server-ws
```

### 生产环境构建

```bash
# 构建前端项目
npm run build

# 启动生产服务器
npm run start
```

## 项目结构

```
├── src/                 # 前端源码
│   ├── views/          # 页面组件
│   │   ├── Home.vue    # 首页
│   │   ├── About.vue   # 关于我们
│   │   ├── Activity.vue# 活动中心
│   │   └── YouthDream.vue # 青春梦想
│   ├── router/         # 路由配置
│   ├── api/            # API请求
│   └── main.js         # 入口文件
├── img/                # 图片资源
├── server.js           # 基础后端服务器
├── server-with-websocket.js # 带WebSocket的后端服务器
├── package.json        # 项目配置
└── vite.config.js      # Vite配置
```

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系协会管理员。
