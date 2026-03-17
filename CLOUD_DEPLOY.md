# 8D报告生成小程序 - 云端部署完整指南

## 🎯 部署目标

在 10 分钟内完成云端部署，让用户可以通过公网链接访问你的 8D 报告生成小程序。

## 📋 部署方案

- **前端**：Vercel（免费，自动 HTTPS）
- **后端**：Railway（免费额度，支持 Node.js）

---

## 🚀 快速开始（3 步）

### 第 1 步：构建应用（2 分钟）

#### 方法1：使用部署脚本（推荐）

**Windows 用户：**
```bash
# 双击运行
cloud-deploy.bat
```

**Mac/Linux 用户：**
```bash
# 赋予执行权限
chmod +x cloud-deploy.sh

# 运行
./cloud-deploy.sh
```

选择选项 4（一键构建所有版本）

#### 方法2：手动构建

```bash
# 构建 H5 版本
pnpm build:web

# 构建后端版本
pnpm --filter server build
```

构建完成后，你会看到：
- `dist-web/` - H5 前端文件
- `server/dist/` - 后端文件

---

### 第 2 步：部署后端到 Railway（5 分钟）

#### 2.1 注册 Railway 账号

1. 访问：https://railway.app
2. 点击 "Start a New Project" 或 "Sign Up"
3. 选择使用 GitHub 账号登录（推荐）
4. 铁道会自动给你 $5 的免费额度

#### 2.2 创建新项目

1. 登录后，点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 或者选择 "New Project" → "Empty Project"

#### 2.3 上传代码

**选项 A：通过 GitHub 推荐**

1. 将你的项目上传到 GitHub
2. 在 Railway 中选择你的仓库
3. Railway 会自动检测 Node.js 项目

**选项 B：直接上传**

1. 在项目设置中，选择 "Upload Files"
2. 上传 `server` 文件夹的所有内容
3. 包括 `package.json`, `dist/`, `src/` 等

#### 2.4 配置环境变量

1. 进入项目设置 → Variables
2. 添加以下环境变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_ENV` | `production` | 生产环境 |
| `PORT` | `3000` | 服务端口 |
| `COZE_LLM_API_KEY` | 你的 API 密钥 | LLM API 密钥 |

**重要：COZE_LLM_API_KEY 是必需的！**

#### 2.5 部署并获取地址

1. 点击 "Deploy" 按钮
2. 等待 1-2 分钟，部署完成
3. Railway 会提供一个域名，例如：`https://your-backend.railway.app`

**测试后端：**
```
https://your-backend.railway.app/api
```

应该返回 404 或相关信息，表示服务正常运行。

---

### 第 3 步：部署前端到 Vercel（3 分钟）

#### 3.1 注册 Vercel 账号

1. 访问：https://vercel.com
2. 用 GitHub 账号登录（免费）
3. Vercel 会自动给你 Hobby Plan（免费）

#### 3.2 上传前端文件

**方法 A：直接拖拽（最简单）**

1. 点击 "Add New" → "Project"
2. 选择 "Upload"
3. 将 `dist-web` 文件夹中的所有文件拖拽上传
4. 包括 `index.html`, `css/`, `js/`

**方法 B：通过 GitHub**

1. 将 `dist-web` 内容上传到 GitHub 仓库
2. 在 Vercel 中导入仓库
3. 配置构建目录为 `dist-web`

#### 3.3 配置环境变量

1. 进入项目设置 → Environment Variables
2. 添加环境变量：

| 变量名 | 值 |
|--------|-----|
| `VITE_API_BASE_URL` | `https://your-backend.railway.app` |

**重要：将 your-backend.railway.app 替换为你的 Railway 后端地址！**

#### 3.4 部署并获取地址

1. 点击 "Deploy" 按钮
2. 等待 30 秒，部署完成
3. Vercel 会提供一个域名，例如：`https://your-app.vercel.app`

---

## ✅ 验证部署

### 1. 测试前端
访问你的 Vercel 地址：`https://your-app.vercel.app`

应该能看到 8D 报告生成小程序的首页。

### 2. 测试完整流程

1. 打开前端页面
2. 输入问题描述
3. 完成 8D 报告创建流程
4. 检查是否能正常生成报告

### 3. 检查网络请求

打开浏览器开发者工具（F12）：
- 查看 Network 标签
- 检查 API 请求是否正常
- 确认请求地址指向你的 Railway 后端

---

## 🔧 配置说明

### 前端连接后端

前端需要知道后端的地址，有两种配置方式：

#### 方式1：环境变量（推荐）

在 Vercel 中设置：
```
VITE_API_BASE_URL = https://your-backend.railway.app
```

#### 方式2：直接修改代码

编辑 `src/network.ts` 文件：

```typescript
const createUrl = (url: string): string => {
    // 生产环境直接使用 Railway 地址
    const PROD_DOMAIN = 'https://your-backend.railway.app'
    
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
    }
    return `${PROD_DOMAIN}${url}`
}
```

---

## 🌟 分享给用户

### 1. 直接分享链接

```
https://your-app.vercel.app
```

### 2. 生成二维码

访问：https://cli.im/
将链接转换为二维码，用户扫码即可访问。

### 3. 嵌入到网站

```html
<iframe 
    src="https://your-app.vercel.app" 
    width="100%" 
    height="800px"
    frameborder="0">
</iframe>
```

---

## 📊 监控和维护

### Railway 后端监控

1. 登录 Railway 控制台
2. 查看项目日志
3. 监控资源使用情况
4. 检查错误率

### Vercel 前端监控

1. 登录 Vercel 控制台
2. 查看 Analytics
3. 检查访问统计
4. 监控性能指标

### 更新部署

**更新后端：**
```bash
pnpm --filter server build
# 重新上传到 Railway
```

**更新前端：**
```bash
pnpm build:web
# 重新上传到 Vercel
```

---

## ⚠️ 常见问题

### Q1: 部署后页面打不开？

**A:** 检查：
1. Vercel 部署是否成功
2. 链接是否正确
3. 是否使用了 HTTPS

### Q2: API 请求失败？

**A:** 检查：
1. 后端服务是否正常运行
2. 环境变量是否正确配置
3. 网络连接是否通畅
4. 浏览器控制台是否有错误（F12）

### Q3: Railway 免费额度用完？

**A:** Railway 免费额度为 $5/月，通常足够测试使用。如果用完：
1. 可以删除不用的项目
2. 或升级付费计划
3. 或改用其他平台（如 Render、Fly.io）

### Q4: 如何配置 LLM API 密钥？

**A:** 在 Railway 项目设置中：
1. 添加环境变量：`COZE_LLM_API_KEY`
2. 填入你的 API 密钥
3. 重新部署项目

---

## 🎯 部署检查清单

在分享给用户之前，确保：

- [ ] 后端已部署到 Railway
- [ ] 后端 API 地址可访问
- [ ] 前端已部署到 Vercel
- [ ] 前端正确配置后端地址
- [ ] 完整测试 8D 报告创建流程
- [ ] 网络请求正常工作
- [ ] LLM API 密钥已配置
- [ ] 没有明显的错误或 bug

---

## 🚀 下一步

### 1. 优化性能

- 启用 CDN 加速
- 压缩资源文件
- 优化图片加载

### 2. 添加功能

- 用户登录
- 历史记录
- 数据统计
- 报告导出 PDF

### 3. 监控用户

- 集成 Google Analytics
- 收集用户反馈
- 分析使用数据

### 4. 正式发布

- 注册微信小程序
- 提交审核
- 正式发布

---

## 📞 需要帮助？

### 快速排查

1. 打开浏览器控制台（F12）
2. 查看 Console 标签的错误信息
3. 查看 Network 标签的请求状态
4. 检查 Vercel 和 Railway 的日志

### 推荐工具

- **Vercel**: https://vercel.com
- **Railway**: https://railway.app
- **Railway CLI**: `npm install -g @railway/cli`

---

## 🎉 恭喜！

如果你已经完成以上步骤，你的 8D 报告生成小程序已经成功部署到云端！

现在你可以：
1. ✅ 分享链接给用户
2. ✅ 生成二维码方便访问
3. ✅ 收集用户反馈
4. ✅ 持续优化功能

祝你成功！🚀
