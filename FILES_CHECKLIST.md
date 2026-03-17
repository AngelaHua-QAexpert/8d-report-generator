# 8D报告生成小程序 - 部署文件清单

## 📁 已准备的文件

### 部署配置文件
- ✅ `vercel.json` - Vercel 部署配置
- ✅ `railway.toml` - Railway 部署配置

### 部署脚本
- ✅ `cloud-deploy.sh` - Mac/Linux 部署脚本
- ✅ `cloud-deploy.bat` - Windows 部署脚本

### 文档文件
- ✅ `QUICK_DEPLOY.md` - 10分钟快速部署指南（推荐先看这个）
- ✅ `CLOUD_DEPLOY.md` - 详细云端部署指南
- ✅ `DEPLOY_GUIDE.md` - 通用部署指南
- ✅ `USER_GUIDE.md` - 用户使用说明

### 构建文件
- ✅ `dist-web/` - H5 前端构建文件
- ✅ `server/dist/` - 后端构建文件

---

## 🚀 快速开始

### 第1步：查看快速部署指南
```
打开文件：QUICK_DEPLOY.md
```

### 第2步：使用部署脚本
```
Windows: 双击 cloud-deploy.bat
Mac/Linux: 运行 ./cloud-deploy.sh
```

### 第3步：按照文档部署
```
参考 QUICK_DEPLOY.md 的步骤
10分钟内完成部署
```

---

## 📋 部署步骤概览

### 1. 构建应用（2分钟）
- 运行 `cloud-deploy.bat` 或 `cloud-deploy.sh`
- 选择选项 4：一键构建所有版本

### 2. 部署后端（5分钟）
- 注册 Railway 账号
- 上传项目文件
- 配置环境变量
- 获取后端地址

### 3. 部署前端（3分钟）
- 注册 Vercel 账号
- 上传 `dist-web` 文件夹
- 配置环境变量
- 获取前端地址

### 4. 验证部署（1分钟）
- 测试前端访问
- 测试完整流程
- 检查 API 连接

**总计：10-11分钟**

---

## 🔧 环境变量配置

### Railway 后端
```
NODE_ENV = production
PORT = 3000
COZE_LLM_API_KEY = 你的API密钥
```

### Vercel 前端
```
VITE_API_BASE_URL = https://your-backend.railway.app
```

---

## 📚 文档说明

### 推荐阅读顺序

1. **QUICK_DEPLOY.md**（必读）
   - 10分钟快速部署
   - 最简单的部署方法

2. **CLOUD_DEPLOY.md**（可选）
   - 详细的云端部署指南
   - 包含故障排查

3. **USER_GUIDE.md**（可选）
   - 用户使用说明
   - 8D方法介绍

---

## 🎯 部署检查清单

在分享给用户之前，确保：

- [ ] 已运行部署脚本构建应用
- [ ] 后端已部署到 Railway
- [ ] 前端已部署到 Vercel
- [ ] 环境变量已正确配置
- [ ] 完整测试 8D 报告创建流程
- [ ] API 请求正常工作
- [ ] 没有明显的错误或 bug

---

## 🌟 账号准备

在开始部署前，准备以下账号：

| 平台 | 用途 | 费用 | 注册地址 |
|------|------|------|----------|
| GitHub | 代码托管 | 免费 | https://github.com |
| Railway | 后端托管 | $5免费额度 | https://railway.app |
| Vercel | 前端托管 | 免费 | https://vercel.com |

**注意：LLM API 密钥是必需的！**

---

## 🆘 需要帮助？

### 查看文档
- `QUICK_DEPLOY.md` - 快速开始
- `CLOUD_DEPLOY.md` - 详细说明
- `DEPLOY_GUIDE.md` - 通用指南

### 常见问题
1. 部署后页面打不开？
2. API 请求失败？
3. 如何配置 API 密钥？

所有问题都在 `CLOUD_DEPLOY.md` 中有详细说明。

---

## 🎉 准备就绪！

所有文件都已准备完毕，你可以立即开始部署！

### 推荐流程

1. 阅读快速部署指南：`QUICK_DEPLOY.md`
2. 运行部署脚本：`cloud-deploy.bat` 或 `cloud-deploy.sh`
3. 按照指南完成部署
4. 分享链接给用户

### 预计时间
- 首次部署：10-15 分钟
- 后续更新：2-3 分钟

祝你部署成功！🚀
