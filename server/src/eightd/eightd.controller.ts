import { Controller, Post, Body } from '@nestjs/common'
import { EightDService } from './eightd.service'

@Controller('eightd')
export class EightDController {
  constructor(private readonly eightDService: EightDService) {}

  /**
   * 分析问题描述，生成引导问题
   */
  @Post('analyze-problem')
  async analyzeProblem(@Body() body: {
    problemDescription: string
    problemOccurrence?: string
    problemImpact?: string
  }) {
    console.log('[API] 收到问题分析请求:', body)
    const result = await this.eightDService.analyzeProblem(body)
    console.log('[API] 问题分析结果:', result)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }

  /**
   * 分析根本原因
   */
  @Post('analyze-root-causes')
  async analyzeRootCauses(@Body() body: {
    problemDetails: string
  }) {
    console.log('[API] 收到根本原因分析请求:', body)
    const result = await this.eightDService.analyzeRootCauses(body.problemDetails)
    console.log('[API] 根本原因分析结果:', result)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }

  /**
   * 生成改善措施
   */
  @Post('generate-solutions')
  async generateSolutions(@Body() body: {
    rootCause: string
  }) {
    console.log('[API] 收到改善措施生成请求:', body)
    const result = await this.eightDService.generateSolutions(body.rootCause)
    console.log('[API] 改善措施生成结果:', result)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }

  /**
   * 生成完整的8D报告
   */
  @Post('generate-report')
  async generateReport(@Body() body: any) {
    console.log('[API] 收到报告生成请求')
    const result = await this.eightDService.generateReport(body)
    console.log('[API] 报告生成结果:', result)
    return {
      code: 200,
      msg: 'success',
      data: {
        report: result
      }
    }
  }
}
