# 8D报告生成小程序 - 10分钟快速部署

## 🎯 目标
在 10 分钟内完成云端部署，让用户可以通过公网链接访问你的应用。

---

## ⏱️ 时间规划

| 步骤 | 时间 | 说明 |
|------|------|------|
| 构建应用 | 2分钟 | 准备前端和后端文件 |
| 部署后端 | 5分钟 | 部署到 Railway |
| 部署前端 | 3分钟 | 部署到 Vercel |
| **总计** | **10分钟** | - |

---

## 📝 准备工作

在开始之前，你需要：

1. ✅ 一个 GitHub 账号（免费）
2. ✅ 一个 Railway 账号（免费）
3. ✅ 一个 Vercel 账号（免费）
4. ✅ 一个 LLM API 密钥（必需）

**账号注册：**
- GitHub: https://github.com
- Railway: https://railway.app
- Vercel: https://vercel.com

---

## 🚀 开始部署

### 第 1 步：构建应用（2 分钟）

#### Windows 用户：
```bash
# 双击运行
cloud-deploy.bat
```

#### Mac/Linux 用户：
```bash
# 运行脚本
./cloud-deploy.sh
```

#### 选择选项：4（一键构建所有版本）

等待构建完成，你会看到：
- ✅ H5 构建成功！
- ✅ 后端构建成功！

---

### 第 2 步：部署后端到 Railway（5 分钟）

#### 2.1 创建 Railway 项目

1. 访问：https://railway.app
2. 用 GitHub 账号登录
3. 点击 "New Project" → "Empty Project"

#### 2.2 上传代码

**方式1：拖拽上传（最简单）**
1. 将整个项目文件夹拖拽到 Railway
2. Railway 会自动识别

**方式2：通过 GitHub**
1. 将项目上传到 GitHub
2. 在 Railway 中选择你的仓库

#### 2.3 配置环境变量

1. 进入项目设置 → Variables
2. 添加环境变量：

```
NODE_ENV = production
PORT = 3000
COZE_LLM_API_KEY = 你的API密钥
```

**重要：COZE_LLM_API_KEY 是必需的！**

#### 2.4 部署

1. 点击 "Deploy" 按钮
2. 等待 1-2 分钟
3. 获取后端地址，例如：`https://your-backend.railway.app`

**测试后端：**
访问 `https://your-backend.railway.app/api`，应该看到响应。

---

### 第 3 步：部署前端到 Vercel（3 分钟）

#### 3.1 创建 Vercel 项目

1. 访问：https://vercel.com
2. 用 GitHub 账号登录
3. 点击 "Add New" → "Project"
4. 选择 "Upload"

#### 3.2 上传前端文件

1. 打开 `dist-web` 文件夹
2. 选择所有文件（`index.html`, `css/`, `js/`）
3. 拖拽到 Vercel 上传区域
4. 点击 "Deploy"

#### 3.3 配置环境变量

1. 部署完成后，进入项目设置
2. 添加环境变量：

```
VITE_API_BASE_URL = https://your-backend.railway.app
```

**重要：将 your-backend.railway.app 替换为你的实际 Railway 后端地址！**

#### 3.4 重新部署

1. 点击 "Redeploy"
2. 等待 30 秒
3. 获取前端地址，例如：`https://your-app.vercel.app`

---

## ✅ 验证部署

### 1. 打开前端
访问你的 Vercel 地址：`https://your-app.vercel.app`

### 2. 测试完整流程
1. 输入问题描述
2. 完成 8D 报告创建
3. 检查是否能正常生成报告

### 3. 检查 API
打开浏览器开发者工具（F12）：
- 查看 Network 标签
- 检查 API 请求是否正常
- 确认请求地址指向你的后端

---

## 🎉 部署完成！

现在你的 8D 报告生成小程序已经上线！

### 分享链接

```
https://your-app.vercel.app
```

### 生成二维码

访问：https://cli.im/ 将链接转为二维码

---

## ⚠️ 常见问题

### Q1: 部署后页面打不开？

**A:** 检查 Vercel 部署状态，确保部署成功。

### Q2: API 请求失败？

**A:** 检查：
1. 后端服务是否正常运行
2. 环境变量是否正确配置
3. 浏览器控制台（F12）查看错误

### Q3: 没有API密钥？

**A:** 你需要获取 LLM API 密钥才能使用 AI 功能。

---

## 📚 详细文档

如果遇到问题，查看详细文档：`CLOUD_DEPLOY.md`

---

## 🚀 下一步

1. 分享链接给用户
2. 收集反馈
3. 持续优化

祝你部署成功！🎊
