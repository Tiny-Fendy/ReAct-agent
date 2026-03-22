# @react-agent/electron

AI 对话桌面应用 - 基于 Electron + React + TypeScript

## 技术栈

- **Electron** - 跨平台桌面应用框架
- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Ant Design** - UI 组件库
- **Vite** - 构建工具
- **@react-agent/core** - AI Agent 核心模块

## 开发

```bash
# 安装依赖
pnpm install

# 编译 TypeScript
pnpm --filter @react-agent/electron build

# 启动 Vite 开发服务器
cd apps/electron && npx vite

# 另开终端启动 Electron
cd apps/electron && npx electron .
```

## 构建

```bash
# 生产构建 (TypeScript + Vite)
cd apps/electron
npx tsc
npx vite build

# 启动应用
npx electron .
```

## 项目结构

```
apps/electron/
├── src/
│   ├── main/              # Electron 主进程
│   │   ├── index.ts       # 主进程入口
│   │   └── preload.ts     # 预加载脚本
│   ├── renderer/          # React 渲染进程
│   │   ├── components/    # UI 组件
│   │   ├── styles/        # 样式文件
│   │   ├── App.tsx        # 主组件
│   │   ├── index.html     # HTML 模板
│   │   └── index.tsx      # React 入口
│   └── types/             # TypeScript 类型定义
├── dist/                  # 构建输出目录
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 功能特性

- ✅ 现代化聊天界面
- ✅ 基于 Ant Design 的 UI 组件
- ✅ IPC 进程间通信
- ✅ TypeScript 类型安全
- ✅ Vite 快速构建
- 🔄 集成 @react-agent/core AI 能力 (待实现)

## TODO

- [ ] 集成 @react-agent/core 实现真实 AI 对话
- [ ] 添加对话历史记录功能
- [ ] 添加设置面板
- [ ] 添加主题切换功能
- [ ] 打包分发配置
