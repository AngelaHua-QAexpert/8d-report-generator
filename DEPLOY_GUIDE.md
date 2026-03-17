# 8D报告生成小程序 - 快速部署指南

## 🎯 最快让用户试用的方法（推荐）

### 方案1：使用 Vercel 免费部署（⭐ 推荐，5分钟完成）

#### 操作步骤：

**第1步：准备文件（1分钟）**
```
文件位置：/workspace/projects/dist-web/
需要文件：index.html, css/ 文件夹, js/ 文件夹
操作方式：将这些文件下载到电脑
```

**第2步：上传到 Vercel（3分钟）**
1. 访问：https://vercel.com
2. 用 GitHub 账号登录（免费）
3. 点击 "Add New" → "Project"
4. 选择 "Upload" 或直接拖拽文件
5. 点击 "Deploy" 按钮

**第3步：获取链接（1分钟）**
- Vercel 会给你一个链接，例如：`https://your-app.vercel.app`
- 直接分享这个链接给用户

---

## ⚙️ 后端部署（必需）

### 方法1：使用本地服务器（测试用）

```bash
cd /workspace/projects
pnpm dev
```

后端运行地址：http://localhost:3000

### 方法2：使用 Railway 免费部署（推荐）

1. 访问：https://railway.app
2. 注册账号（免费）
3. 创建新项目
4. 部署 Node.js 服务
5. 获取后端服务地址

---

## 📱 其他部署方式

### 方案2：Netlify（超简单，30秒）

1. 访问：https://app.netlify.com/drop
2. 拖拽 `dist-web` 文件夹的所有文件
3. 自动获得分享链接

### 方案3：GitHub Pages（免费）

1. 创建 GitHub 仓库
2. 上传 `dist-web` 内容
3. Settings → Pages → 启用
4. 获得 GitHub Pages 链接

---

## 🔧 配置前端连接后端

### 重要：前端需要知道后端地址

**当前前端配置：**
- 开发环境：`http://localhost:3000`
- 生产环境：需要配置你的实际后端地址

**配置方式：**
编辑 `src/network.ts` 或使用环境变量

---

## 🌐 分享链接给用户

### 1. 直接分享链接
```
例如：https://your-app.vercel.app
```

### 2. 生成二维码
访问：https://cli.im/ 将链接转换为二维码

### 3. 嵌入到网站
```html
<iframe src="你的链接" width="100%" height="800px"></iframe>
```

---

## ⚠️ 常见问题

### Q1: 部署后页面打不开？
检查：
1. 链接是否正确
2. 服务器是否正常
3. 是否使用 HTTPS

### Q2: 功能无法使用？
检查：
1. 后端服务是否运行
2. API 地址配置是否正确
3. 浏览器控制台（F12）查看错误

### Q3: 如何测试？
1. 用手机浏览器访问链接
2. 完整测试创建8D报告流程
3. 检查所有功能是否正常

---

## 🎯 推荐的首次发布流程

### Day 1: 部署测试版
1. 使用 Vercel 部署前端
2. 本地或云端部署后端
3. 自己完整测试一遍

### Day 2: 邀请内测用户
1. 分享链接给5-10个朋友
2. 收集反馈
3. 修复发现的问题

### Day 3: 正式分享
1. 将链接分享到更多群/平台
2. 生成二维码方便分享
3. 持续收集反馈并改进

---

## 🚀 快速开始

### Windows 用户：
1. 下载 `dist-web` 文件夹
2. 上传到 Vercel/Netlify
3. 分享链接给用户

### Mac/Linux 用户：
1. 下载 `dist-web` 文件夹
2. 上传到 Vercel/Netlify
3. 分享链接给用户

---

## 📞 需要帮助？

### 排查步骤：
1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 检查网络请求状态

### 推荐工具：
- Vercel: https://vercel.com
- Netlify: https://netlify.com
- Railway: https://railway.app

---

祝你部署成功！🎉

有任何问题随时询问！
