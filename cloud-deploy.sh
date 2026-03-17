#!/bin/bash

# 8D报告生成小程序 - 云端部署脚本

set -e

echo "🚀 8D报告生成小程序 - 云端部署助手"
echo "======================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 未安装 Node.js，请先安装：https://nodejs.org/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js 版本: $(node -v)${NC}"
echo ""

# 选择部署模式
echo "请选择部署模式："
echo "1) 本地开发测试"
echo "2) 构建 H5 版本（用于 Vercel 部署）"
echo "3) 构建后端版本（用于 Railway 部署）"
echo "4) 一键构建所有版本"
echo ""
read -p "请输入选项 (1/2/3/4): " choice

case $choice in
    1)
        echo ""
        echo -e "${BLUE}📦 启动本地开发环境...${NC}"
        pnpm dev

        echo ""
        echo -e "${GREEN}✅ 开发环境已启动！${NC}"
        echo -e "${YELLOW}📱 前端地址: http://localhost:5000${NC}"
        echo -e "${YELLOW}🔧 后端地址: http://localhost:3000${NC}"
        echo ""
        echo "按 Ctrl+C 停止服务"
        ;;

    2)
        echo ""
        echo -e "${BLUE}🔨 构建 H5 版本（用于 Vercel 部署）...${NC}"
        pnpm build:web

        if [ -d "dist-web" ]; then
            echo -e "${GREEN}✅ H5 构建成功！${NC}"
            echo -e "${YELLOW}📁 构建文件位于: dist-web/${NC}"
            echo ""
            echo "下一步操作："
            echo "1. 访问 https://vercel.com"
            echo "2. 用 GitHub 账号登录"
            echo "3. 上传 dist-web 文件夹的内容"
            echo "4. 配置后端 API 地址"
            echo ""
            echo "详细步骤请查看：CLOUD_DEPLOY.md"
        else
            echo -e "${RED}❌ 构建失败${NC}"
            exit 1
        fi
        ;;

    3)
        echo ""
        echo -e "${BLUE}🔨 构建后端版本（用于 Railway 部署）...${NC}"
        pnpm --filter server build

        if [ -d "server/dist" ]; then
            echo -e "${GREEN}✅ 后端构建成功！${NC}"
            echo -e "${YELLOW}📁 构建文件位于: server/dist/${NC}"
            echo ""
            echo "下一步操作："
            echo "1. 访问 https://railway.app"
            echo "2. 注册账号（免费额度）"
            echo "3. 创建新项目"
            echo "4. 上传 server 文件夹"
            echo "5. 配置环境变量：COZE_LLM_API_KEY"
            echo ""
            echo "详细步骤请查看：CLOUD_DEPLOY.md"
        else
            echo -e "${RED}❌ 构建失败${NC}"
            exit 1
        fi
        ;;

    4)
        echo ""
        echo -e "${BLUE}🔨 构建所有版本...${NC}"

        echo "构建 H5 版本..."
        pnpm build:web

        echo "构建后端版本..."
        pnpm --filter server build

        if [ -d "dist-web" ] && [ -d "server/dist" ]; then
            echo -e "${GREEN}✅ 所有版本构建成功！${NC}"
            echo -e "${YELLOW}📁 H5 文件: dist-web/${NC}"
            echo -e "${YELLOW}📁 后端文件: server/dist/${NC}"
            echo ""
            echo "下一步操作："
            echo "1. 按照 CLOUD_DEPLOY.md 文档部署"
            echo "2. 先部署后端到 Railway"
            echo "3. 再部署前端到 Vercel"
            echo "4. 配置前端连接后端"
            echo ""
            echo "详细步骤请查看：CLOUD_DEPLOY.md"
        else
            echo -e "${RED}❌ 构建失败${NC}"
            exit 1
        fi
        ;;

    *)
        echo -e "${RED}❌ 无效选项${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}🎉 操作完成！${NC}"
