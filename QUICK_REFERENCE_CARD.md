# 📋 部署快速参考卡

## 🎯 目标
在 15-20 分钟内完成部署，获取可分享的公网链接

---

## 📝 必需准备

| 项目 | 说明 | 获取方式 |
|------|------|----------|
| LLM API 密钥 | AI 功能必需 | 从你的 LLM 服务提供商获取 |
| GitHub 账号 | 登录平台使用 | https://github.com |
| Railway 账号 | 部署后端 | https://railway.app |
| Vercel 账号 | 部署前端 | https://vercel.com |

---

## 🚀 部署步骤（7步）

### 1️⃣ 部署后端到 Railway
- 登录 https://railway.app
- 创建新项目，上传代码
- 配置环境变量：
  ```
  NODE_ENV=production
  PORT=3000
  COZE_LLM_API_KEY=你的API密钥
  ```
- 点击 Deploy，等待 5-10 分钟
- **复制后端地址**（类似：https://your-backend.railway.app）

### 2️⃣ 部署前端到 Vercel
- 登录 https://vercel.com
- 创建新项目，上传 `dist-web` 文件夹
- 等待部署完成（30秒）
- **复制前端地址**（类似：https://your-app.vercel.app）

### 3️⃣ 配置前后端连接
- 在 Vercel 项目设置中，添加环境变量：
  ```
  VITE_API_BASE_URL=你的后端地址
  ```
- 重新部署前端（Redeploy）

### 4️⃣ 验证部署
- 访问前端地址
- 测试问题描述功能
- 测试 AI 分析功能
- 测试报告生成功能

### 5️⃣ 获取分享链接
- 你的分享链接就是前端地址：
  ```
  https://your-app.vercel.app
  ```

### 6️⃣ 分享给用户
- 直接分享链接
- 或生成二维码（https://cli.im/）

### 7️⃣ 持续监控
- 定期查看 Railway 和 Vercel 日志
- 确保服务稳定运行

---

## ⏱️ 时间分配

| 步骤 | 时间 |
|------|------|
| 准备账号 | 5分钟 |
| 部署后端 | 5-10分钟 |
| 部署前端 | 3-5分钟 |
| 配置验证 | 2分钟 |
| **总计** | **15-20分钟** |

---

## 🔑 关键配置

### Railway 后端环境变量
```
NODE_ENV=production
PORT=3000
COZE_LLM_API_KEY=你的API密钥
```

### Vercel 前端环境变量
```
VITE_API_BASE_URL=https://your-backend.railway.app
```

---

## ✅ 验证检查

- [ ] 前端页面可以打开
- [ ] 输入问题描述可以提交
- [ ] AI 分析功能正常
- [ ] 报告可以正常生成
- [ ] 可以分享链接给用户

---

## ⚠️ 常见问题

### 问题：前端打不开
**解决**：检查 Vercel 部署状态，确认部署成功

### 问题：API 请求失败
**解决**：检查 `VITE_API_BASE_URL` 是否正确配置，确认后端服务正常

### 问题：AI 分析不工作
**解决**：检查 `COZE_LLM_API_KEY` 是否正确配置，确认 API 密钥有效

### 问题：部署失败
**解决**：查看部署日志，检查构建文件是否完整

---

## 📚 详细文档

| 文档 | 用途 |
|------|------|
| [START_DEPLOYING_NOW.md](./START_DEPLOYING_NOW.md) | 立即开始部署 |
| [PRE_DEPLOYMENT_CHECKLIST.md](./PRE_DEPLOYMENT_CHECKLIST.md) | 部署前检查清单 |
| [DEPLOYMENT_STEP_BY_STEP.md](./DEPLOYMENT_STEP_BY_STEP.md) | 详细部署步骤 |
| [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | 快速部署指南 |
| [FAQ.md](./FAQ.md) | 常见问题 |

---

## 🎯 成功标志

部署成功的标志：
- ✅ 前端地址可以访问
- ✅ 所有功能正常工作
- ✅ 有一个可分享的公网链接
- ✅ 用户可以立即使用

---

## 🎊 完成后

1. **分享链接**：将 https://your-app.vercel.app 分享给用户
2. **收集反馈**：收集用户使用反馈
3. **持续优化**：根据反馈优化功能

---

**准备好了吗？开始部署吧！** 🚀
