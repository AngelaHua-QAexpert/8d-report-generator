# 🚀 8D报告生成小程序 - 手把手部署指南

## 📋 部署流程总览

```
准备环境 → 部署后端(Railway) → 获取后端地址 → 部署前端(Vercel) → 配置API地址 → 验证 → 分享链接
```

**预计时间**：15-20 分钟

---

## 🎯 部署前准备清单

在开始之前，请确认以下事项：

- [ ] 我有可用的 LLM API 密钥（COZE_LLM_API_KEY）
- [ ] 我可以访问 GitHub
- [ ] 我可以访问 Vercel
- [ ] 我可以访问 Railway
- [ ] 我的项目代码已经构建完成

---

## 📝 第一步：确认项目已构建

### 检查构建文件

在项目根目录执行：

```bash
# 检查前端构建
ls dist-web

# 检查后端构建
ls server/dist
```

**预期结果：**
- `dist-web/` 应该包含 `index.html`、`css/`、`js/` 等文件
- `server/dist/` 应该包含 `main.js` 等文件

如果构建文件不存在，执行：

```bash
pnpm build
```

---

## 🔧 第二步：部署后端到 Railway

### 2.1 登录 Railway

1. 打开浏览器，访问：https://railway.app
2. 点击右上角 "Login"
3. 使用 GitHub 账号登录（推荐）

### 2.2 创建新项目

1. 登录后，点击 "New Project" 按钮
2. 选择 "Deploy from GitHub repo" 或 "Empty Project"
3. 如果选择 GitHub，授权 Railway 访问你的仓库

### 2.3 上传代码（两种方式）

**方式A：通过 GitHub（推荐）**

1. 将项目上传到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/你的用户名/8d-report-generator.git
   git push -u origin main
   ```

2. 在 Railway 中选择你的仓库
3. Railway 会自动检测到项目结构

**方式B：直接上传（更简单）**

1. 在 Railway 项目页面，点击 "Upload Directory"
2. 选择整个项目文件夹
3. 等待上传完成

### 2.4 配置项目

Railway 会自动检测到 NestJS 项目。如果需要手动配置：

1. 点击 "Settings" → "Build Config"
2. 设置 "Root Directory" 为 `server`
3. 设置 "Build Command" 为 `npm run build`
4. 设置 "Start Command" 为 `node dist/main`

### 2.5 配置环境变量（非常重要！）

1. 在项目页面，点击 "Variables" 标签
2. 点击 "New Variable"
3. 添加以下环境变量：

```env
NODE_ENV = production
PORT = 3000
COZE_LLM_API_KEY = 你的LLM_API密钥
```

**重要提示：**
- `COZE_LLM_API_KEY` 是必需的，否则 AI 功能无法使用
- 确保 API 密钥格式正确，不要有多余的空格或引号

### 2.6 启动部署

1. 点击 "Deploy" 按钮
2. 等待 2-3 分钟，Railway 会自动构建和部署
3. 查看部署日志，确认没有错误

### 2.7 获取后端地址

部署成功后，Railway 会提供一个地址，格式类似：

```
https://your-backend.railway.app
```

**复制这个地址，下一步需要用到！**

### 2.8 验证后端服务

在浏览器中访问：

```
https://your-backend.railway.app/api/eightd/health
```

或者使用 curl 测试：

```bash
curl https://your-backend.railway.app/api/eightd/health
```

如果看到响应（可能是 404 或其他响应），说明后端服务正常运行。

---

## 🎨 第三步：部署前端到 Vercel

### 3.1 登录 Vercel

1. 打开浏览器，访问：https://vercel.com
2. 点击右上角 "Login"
3. 使用 GitHub 账号登录

### 3.2 创建新项目

1. 登录后，点击 "Add New" → "Project"
2. 点击 "Upload Files"

### 3.3 上传前端文件

**重要：只上传 `dist-web` 文件夹的内容！**

1. 打开项目目录
2. 进入 `dist-web` 文件夹
3. 选择所有文件（按 `Ctrl+A` 或 `Cmd+A`）
4. 拖拽到 Vercel 的上传区域
5. 点击 "Deploy"

### 3.4 等待部署

Vercel 会在 30 秒内完成部署，并提供一个地址，格式类似：

```
https://your-app.vercel.app
```

**复制这个地址，这是你的前端应用地址！**

### 3.5 配置环境变量（连接前后端）

1. 在 Vercel 项目页面，点击 "Settings" → "Environment Variables"
2. 点击 "Add New"
3. 添加以下环境变量：

```env
VITE_API_BASE_URL = https://your-backend.railway.app
```

**重要提示：**
- 将 `https://your-backend.railway.app` 替换为你在第二步获取的实际后端地址
- 不要在 URL 后面加斜杠 `/`

### 3.6 重新部署

1. 点击 "Deployments" 标签
2. 找到最新的部署记录
3. 点击右侧的 "..." 按钮
4. 选择 "Redeploy"
5. 等待 30 秒

---

## ✅ 第四步：验证部署

### 4.1 打开前端应用

在浏览器中访问你的 Vercel 地址：

```
https://your-app.vercel.app
```

### 4.2 测试功能

1. **测试页面加载**
   - 应该能看到 8D 报告生成器的首页
   - 页面应该正常显示，没有错误

2. **测试问题描述功能**
   - 点击"开始创建报告"
   - 输入一个问题描述，例如："产品出现质量问题"
   - 点击"下一步"

3. **测试 AI 分析功能**
   - 如果 API 配置正确，应该能看到 AI 生成的引导性问题
   - 点击"下一步"继续

4. **测试报告生成**
   - 完成所有步骤后，点击"生成报告"
   - 应该能看到完整的 8D 报告

### 4.3 检查网络请求

如果功能异常，打开浏览器开发者工具（F12）：

1. 切换到 "Network" 标签
2. 刷新页面
3. 查看是否有红色的请求（失败的请求）
4. 点击失败的请求，查看详细信息

**常见问题：**
- 如果请求失败，检查 `VITE_API_BASE_URL` 是否正确配置
- 如果出现 CORS 错误，检查后端是否正确配置了 CORS
- 如果出现 404 错误，检查 API 路径是否正确

---

## 🎉 第五步：获取分享链接

### 5.1 复制应用链接

你的应用链接就是 Vercel 提供的地址：

```
https://your-app.vercel.app
```

### 5.2 生成二维码（可选）

如果你想分享给手机用户，可以生成二维码：

1. 访问：https://cli.im/
2. 将你的应用链接粘贴进去
3. 生成二维码并下载

---

## 📱 第六步：分享给用户

### 分享方式

**方式1：直接分享链接**
```
这是8D报告生成小程序，请访问：
https://your-app.vercel.app
```

**方式2：分享二维码**
```
扫描二维码即可访问8D报告生成小程序
```

**方式3：嵌入到网页**
```html
<iframe src="https://your-app.vercel.app" width="100%" height="600"></iframe>
```

---

## 🔍 第七步：监控和维护

### 查看日志

**后端日志（Railway）**
1. 登录 Railway
2. 打开你的项目
3. 点击 "Logs" 标签
4. 实时查看后端日志

**前端日志（Vercel）**
1. 登录 Vercel
2. 打开你的项目
3. 点击 "Deployments"
4. 点击最新的部署记录
5. 查看 "Build Log" 和 "Function Log"

### 更新应用

**更新后端**
1. 修改代码
2. 推送到 GitHub
3. Railway 会自动重新部署

**更新前端**
1. 运行 `pnpm build:web`
2. 上传新的 `dist-web` 文件夹到 Vercel
3. 重新部署

---

## ⚠️ 常见问题排查

### 问题1：前端打开但API请求失败

**检查清单：**
- [ ] 后端服务是否正常运行？
- [ ] `VITE_API_BASE_URL` 是否正确配置？
- [ ] 后端地址是否可以访问？
- [ ] 浏览器控制台是否有错误？

**解决方案：**
1. 确认后端地址：`https://your-backend.railway.app`
2. 在 Vercel 中更新 `VITE_API_BASE_URL`
3. 重新部署前端

### 问题2：后端部署失败

**检查清单：**
- [ ] `server` 目录下是否有 `package.json`？
- [ ] 环境变量是否正确配置？
- [ ] `COZE_LLM_API_KEY` 是否有效？

**解决方案：**
1. 查看 Railway 部署日志
2. 检查 `package.json` 中的依赖
3. 确认 API 密钥格式正确

### 问题3：AI分析功能不工作

**检查清单：**
- [ ] `COZE_LLM_API_KEY` 是否配置？
- [ ] API 密钥是否有效？
- [ ] 后端是否正常响应？

**解决方案：**
1. 检查 Railway 环境变量
2. 验证 API 密钥是否有效
3. 查看后端日志，确认是否有错误

### 问题4：页面样式错乱

**检查清单：**
- [ ] 前端是否成功构建？
- [ ] CSS 文件是否正确上传？
- [ ] 是否有网络问题？

**解决方案：**
1. 重新构建前端：`pnpm build:web`
2. 重新上传到 Vercel
3. 清除浏览器缓存

---

## 🎊 恭喜！部署完成！

你现在有了：

✅ **可访问的 8D 报告生成应用**
✅ **功能完整的 AI 智能分析**
✅ **可以分享给用户的公网链接**

---

## 📚 相关文档

- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 快速部署指南
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署文档
- [FAQ.md](./FAQ.md) - 常见问题
- [USAGE.md](./USAGE.md) - 使用说明

---

## 💡 下一步建议

1. **分享链接**：将应用链接分享给团队或客户
2. **收集反馈**：收集用户使用反馈
3. **持续优化**：根据反馈优化功能
4. **监控使用**：定期查看日志，确保服务稳定

祝你使用愉快！🎉
