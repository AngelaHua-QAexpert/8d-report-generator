@echo off
chcp 65001 > nul
echo 🚀 8D报告生成小程序 - 云端部署助手
echo ======================================
echo.

setlocal enabledelayedexpansion

REM 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未安装 Node.js，请先安装：https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js 版本: %NODE_VERSION%
echo.

echo 请选择部署模式：
echo 1) 本地开发测试
echo 2) 构建 H5 版本（用于 Vercel 部署）
echo 3) 构建后端版本（用于 Railway 部署）
echo 4) 一键构建所有版本
echo.
set /p choice="请输入选项 (1/2/3/4): "

if "%choice%"=="1" (
    echo.
    echo 📦 启动本地开发环境...
    call pnpm dev

    echo.
    echo ✅ 开发环境已启动！
    echo 📱 前端地址: http://localhost:5000
    echo 🔧 后端地址: http://localhost:3000
    echo.
    echo 按 Ctrl+C 停止服务
) else if "%choice%"=="2" (
    echo.
    echo 🔨 构建 H5 版本（用于 Vercel 部署）...
    call pnpm build:web

    if exist "dist-web" (
        echo ✅ H5 构建成功！
        echo 📁 构建文件位于: dist-web\
        echo.
        echo 下一步操作：
        echo 1. 访问 https://vercel.com
        echo 2. 用 GitHub 账号登录
        echo 3. 上传 dist-web 文件夹的内容
        echo 4. 配置后端 API 地址
        echo.
        echo 详细步骤请查看：CLOUD_DEPLOY.md
    ) else (
        echo ❌ 构建失败
        pause
        exit /b 1
    )
) else if "%choice%"=="3" (
    echo.
    echo 🔨 构建后端版本（用于 Railway 部署）...
    call pnpm --filter server build

    if exist "server\dist" (
        echo ✅ 后端构建成功！
        echo 📁 构建文件位于: server\dist\
        echo.
        echo 下一步操作：
        echo 1. 访问 https://railway.app
        echo 2. 注册账号（免费额度）
        echo 3. 创建新项目
        echo 4. 上传 server 文件夹
        echo 5. 配置环境变量：COZE_LLM_API_KEY
        echo.
        echo 详细步骤请查看：CLOUD_DEPLOY.md
    ) else (
        echo ❌ 构建失败
        pause
        exit /b 1
    )
) else if "%choice%"=="4" (
    echo.
    echo 🔨 构建所有版本...

    echo 构建 H5 版本...
    call pnpm build:web

    echo 构建后端版本...
    call pnpm --filter server build

    if exist "dist-web" if exist "server\dist" (
        echo ✅ 所有版本构建成功！
        echo 📁 H5 文件: dist-web\
        echo 📁 后端文件: server\dist\
        echo.
        echo 下一步操作：
        echo 1. 按照 CLOUD_DEPLOY.md 文档部署
        echo 2. 先部署后端到 Railway
        echo 3. 再部署前端到 Vercel
        echo 4. 配置前端连接后端
        echo.
        echo 详细步骤请查看：CLOUD_DEPLOY.md
    ) else (
        echo ❌ 构建失败
        pause
        exit /b 1
    )
) else (
    echo ❌ 无效选项
    pause
    exit /b 1
)

echo.
echo 🎉 操作完成！
pause
