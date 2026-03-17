@echo off
chcp 65001 > nul
echo 🧪 8D报告生成小程序 - 自动化测试
echo ==================================
echo.

setlocal enabledelayedexpansion

set TESTS_PASSED=0
set TESTS_FAILED=0
set TESTS_TOTAL=0

echo 🔍 检查服务状态...
echo.

REM 测试1: 检查前端服务
echo 📝 测试: 前端服务 (端口 5000)
set /a TESTS_TOTAL+=1
netstat -an | findstr ":5000.*LISTEN" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试2: 检查后端服务
echo 📝 测试: 后端服务 (端口 3000)
set /a TESTS_TOTAL+=1
netstat -an | findstr ":3000.*LISTEN" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试3: 检查前端构建文件
echo 📝 测试: 前端构建文件 (index.html)
set /a TESTS_TOTAL+=1
if exist "dist-web\index.html" (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试4: 检查后端构建文件
echo 📝 测试: 后端构建文件 (main.js)
set /a TESTS_TOTAL+=1
if exist "server\dist\main.js" (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

echo 🧪 API 功能测试...
echo.

REM 测试5: 后端健康检查
echo 📝 测试: 后端健康检查
set /a TESTS_TOTAL+=1
curl -s -o nul -w "%%{http_code}" http://localhost:3000 | findstr "404" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试6: 测试问题分析接口
echo 📝 测试: 问题分析接口
set /a TESTS_TOTAL+=1
curl -s -X POST http://localhost:3000/api/eightd/analyze-problem -H "Content-Type: application/json" -d "{\"problemDescription\":\"产品出现质量问题\"}" | findstr "guidanceQuestions" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试7: 测试根本原因分析接口
echo 📝 测试: 根本原因分析接口
set /a TESTS_TOTAL+=1
curl -s -X POST http://localhost:3000/api/eightd/analyze-root-causes -H "Content-Type: application/json" -d "{\"problemDetails\":\"产品出现质量问题\"}" | findstr "potentialCauses" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试8: 测试改善措施接口
echo 📝 测试: 改善措施接口
set /a TESTS_TOTAL+=1
curl -s -X POST http://localhost:3000/api/eightd/generate-solutions -H "Content-Type: application/json" -d "{\"rootCause\":\"材料质量问题\"}" | findstr "permanentActions" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

REM 测试9: 测试报告生成接口
echo 📝 测试: 报告生成接口
set /a TESTS_TOTAL+=1
curl -s -X POST http://localhost:3000/api/eightd/generate-report -H "Content-Type: application/json" -d "{\"d2ProblemDescription\":\"测试问题\",\"d4RootCause\":\"测试原因\"}" | findstr "report" >nul
if !errorlevel! equ 0 (
    echo ✅ 通过
    set /a TESTS_PASSED+=1
) else (
    echo ❌ 失败
    set /a TESTS_FAILED+=1
)
echo.

echo 📊 测试结果汇总
echo ==================================
echo 总测试数: %TESTS_TOTAL%
echo 通过: %TESTS_PASSED%
echo 失败: %TESTS_FAILED%
echo.

if %TESTS_FAILED% equ 0 (
    echo 🎉 所有测试通过！
    echo.
    echo ✅ 前端服务: http://localhost:5000
    echo ✅ 后端服务: http://localhost:3000
    echo.
    echo 📱 你可以访问 http://localhost:5000 查看应用
    echo.
    echo 🌐 准备部署到云端：
    echo 1. 查看 START_HERE.md 文件
    echo 2. 按照 QUICK_DEPLOY.md 部署
    echo 3. 10-15分钟完成云端部署
) else (
    echo ❌ 有 %TESTS_FAILED% 个测试失败
    echo.
    echo 请检查：
    echo 1. 服务是否正常运行
    echo 2. 端口是否被占用
    echo 3. 配置是否正确
    echo 4. 查看错误日志
)

pause
