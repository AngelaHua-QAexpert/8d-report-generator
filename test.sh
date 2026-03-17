#!/bin/bash

# 8D报告生成小程序 - 自动化测试脚本

set -e

echo "🧪 8D报告生成小程序 - 自动化测试"
echo "=================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试结果
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# 测试函数
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected="$3"

    echo -e "${BLUE}📝 测试: ${test_name}${NC}"
    TESTS_TOTAL=$((TESTS_TOTAL + 1))

    if eval "$test_command"; then
        if [ -n "$expected" ]; then
            actual=$(eval "$test_command 2>&1")
            if echo "$actual" | grep -q "$expected"; then
                echo -e "${GREEN}✅ 通过${NC}"
                TESTS_PASSED=$((TESTS_PASSED + 1))
            else
                echo -e "${RED}❌ 失败 - 期望: ${expected}${NC}"
                TESTS_FAILED=$((TESTS_FAILED + 1))
            fi
        else
            echo -e "${GREEN}✅ 通过${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        fi
    else
        echo -e "${RED}❌ 失败${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
    echo ""
}

echo "🔍 检查服务状态..."
echo ""

# 测试1: 检查前端服务
run_test "前端服务 (端口 5000)" \
    "ss -tuln 2>/dev/null | grep -E ':5000' | grep -q LISTEN" \
    "LISTEN"

# 测试2: 检查后端服务
run_test "后端服务 (端口 3000)" \
    "ss -tuln 2>/dev/null | grep -E ':3000' | grep -q LISTEN" \
    "LISTEN"

# 测试3: 检查前端构建文件
run_test "前端构建文件 (index.html)" \
    "test -f dist-web/index.html"

# 测试4: 检查后端构建文件
run_test "后端构建文件 (main.js)" \
    "test -f server/dist/main.js"

echo "🧪 API 功能测试..."
echo ""

# 测试5: 后端健康检查
run_test "后端健康检查" \
    "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000" \
    "404"

# 测试6: 测试问题分析接口
run_test "问题分析接口" \
    "curl -s -X POST http://localhost:3000/api/eightd/analyze-problem \
    -H 'Content-Type: application/json' \
    -d '{\"problemDescription\":\"产品出现质量问题\"}'" \
    '"guidanceQuestions"'

# 测试7: 测试根本原因分析接口
run_test "根本原因分析接口" \
    "curl -s -X POST http://localhost:3000/api/eightd/analyze-root-causes \
    -H 'Content-Type: application/json' \
    -d '{\"problemDetails\":\"产品出现质量问题\"}'" \
    '"potentialCauses"'

# 测试8: 测试改善措施接口
run_test "改善措施接口" \
    "curl -s -X POST http://localhost:3000/api/eightd/generate-solutions \
    -H 'Content-Type: application/json' \
    -d '{\"rootCause\":\"材料质量问题\"}'" \
    '"permanentActions"'

# 测试9: 测试报告生成接口
run_test "报告生成接口" \
    "curl -s -X POST http://localhost:3000/api/eightd/generate-report \
    -H 'Content-Type: application/json' \
    -d '{\"d2ProblemDescription\":\"测试问题\",\"d4RootCause\":\"测试原因\"}'" \
    '"report"'

echo "📊 测试结果汇总"
echo "=================================="
echo -e "总测试数: ${BLUE}${TESTS_TOTAL}${NC}"
echo -e "通过: ${GREEN}${TESTS_PASSED}${NC}"
echo -e "失败: ${RED}${TESTS_FAILED}${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有测试通过！${NC}"
    echo ""
    echo "✅ 前端服务: http://localhost:5000"
    echo "✅ 后端服务: http://localhost:3000"
    echo ""
    echo "📱 你可以访问 http://localhost:5000 查看应用"
    echo ""
    echo "🌐 准备部署到云端："
    echo "1. 查看 START_HERE.md 文件"
    echo "2. 按照 QUICK_DEPLOY.md 部署"
    echo "3. 10-15分钟完成云端部署"
    exit 0
else
    echo -e "${RED}❌ 有 ${TESTS_FAILED} 个测试失败${NC}"
    echo ""
    echo "请检查："
    echo "1. 服务是否正常运行"
    echo "2. 端口是否被占用"
    echo "3. 配置是否正确"
    echo "4. 查看错误日志"
    exit 1
fi
