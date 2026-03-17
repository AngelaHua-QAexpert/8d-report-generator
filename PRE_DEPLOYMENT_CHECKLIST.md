# ✅ 部署前检查清单

## 🔐 必需准备项

- [ ] **LLM API 密钥**（COZE_LLM_API_KEY）
  - 这是使用 AI 功能必需的
  - 如果没有，请先获取 API 密钥

- [ ] **GitHub 账号**
  - 用于部署到 Railway 和 Vercel
  - 注册地址：https://github.com

- [ ] **Railway 账号**
  - 用于部署后端服务
  - 注册地址：https://railway.app
  - 免费额度足够使用

- [ ] **Vercel 账号**
  - 用于部署前端应用
  - 注册地址：https://vercel.com
  - 免费额度足够使用

## 📦 项目构建检查

在开始部署前，请确认以下文件存在：

### 前端构建文件
- [ ] `dist-web/index.html` 存在
- [ ] `dist-web/css/` 文件夹存在
- [ ] `dist-web/js/` 文件夹存在

### 后端构建文件
- [ ] `server/dist/main.js` 存在
- [ ] `server/dist/` 文件夹完整

### 配置文件
- [ ] `package.json` 存在
- [ ] `server/package.json` 存在
- [ ] `vercel.json` 存在
- [ ] `railway.toml` 存在

## 🚀 快速验证构建状态

在项目根目录执行以下命令：

```bash
# 检查前端构建
ls -la dist-web/

# 检查后端构建
ls -la server/dist/
```

**预期输出：**
```
dist-web/
├── index.html
├── css/
│   └── app-xxx.css
└── js/
    └── app-xxx.js

server/dist/
├── main.js
└── (其他构建文件)
```

## ⚠️ 如果构建文件不存在

执行以下命令重新构建：

```bash
# 安装依赖（如果需要）
pnpm install

# 构建所有版本
pnpm build
```

或者只构建需要的版本：

```bash
# 只构建 H5 前端
pnpm build:web

# 只构建后端
cd server && pnpm build && cd ..
```

## 🎯 部署流程预览

```
1. 部署后端到 Railway (5-10分钟)
   ↓
2. 获取后端服务地址
   ↓
3. 部署前端到 Vercel (3-5分钟)
   ↓
4. 配置前后端连接
   ↓
5. 验证功能
   ↓
6. 获取分享链接
```

## ⏱️ 预计时间

| 步骤 | 时间 |
|------|------|
| 准备账号 | 5分钟 |
| 构建项目（如需要） | 2分钟 |
| 部署后端 | 5-10分钟 |
| 部署前端 | 3-5分钟 |
| 配置和验证 | 2分钟 |
| **总计** | **15-20分钟** |

## 📝 下一步

完成所有检查项后，按照以下步骤进行部署：

1. **查看详细部署指南**：[DEPLOYMENT_STEP_BY_STEP.md](./DEPLOYMENT_STEP_BY_STEP.md)
2. **按照步骤一步步操作**
3. **获取公网链接**
4. **分享给用户**

## 🆘 遇到问题？

如果部署过程中遇到问题：

1. 查看详细部署指南：[DEPLOYMENT_STEP_BY_STEP.md](./DEPLOYMENT_STEP_BY_STEP.md)
2. 查看常见问题：[FAQ.md](./FAQ.md)
3. 检查部署日志（Railway 和 Vercel 都提供详细日志）

---

**准备好了吗？开始部署吧！** 🚀
