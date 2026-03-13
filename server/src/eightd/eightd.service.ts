import { Injectable } from '@nestjs/common'
import { LLMClient, Config } from 'coze-coding-dev-sdk'

export interface ProblemAnalysisInput {
  problemDescription: string
  problemOccurrence?: string
  problemImpact?: string
}

export interface ProblemAnalysisOutput {
  guidanceQuestions: string[]
  containmentSuggestion?: string
}

@Injectable()
export class EightDService {
  private llmClient: LLMClient

  constructor() {
    const config = new Config()
    this.llmClient = new LLMClient(config)
  }

  /**
   * 分析问题描述，生成引导问题
   */
  async analyzeProblem(input: ProblemAnalysisInput): Promise<ProblemAnalysisOutput> {
    const { problemDescription, problemOccurrence, problemImpact } = input

    const systemPrompt = `你是一位经验丰富的8D问题解决专家。你的任务是帮助用户完善问题描述。
请基于用户提供的问题描述，生成3-5个引导性问题，帮助用户更准确地描述问题。
问题应该涵盖：问题发生的具体场景、频率、严重程度等关键信息。
输出格式必须是JSON，包含一个guidanceQuestions数组。`

    const userPrompt = `问题描述：${problemDescription}
${problemOccurrence ? `\n发生时间：${problemOccurrence}` : ''}
${problemImpact ? `\n影响范围：${problemImpact}` : ''}

请生成3-5个引导性问题，帮助用户更准确地描述问题。请以JSON格式返回，格式如下：
{
  "guidanceQuestions": [
    "问题1",
    "问题2",
    ...
  ]
}`

    try {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]

      const response = await this.llmClient.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7
      })

      // 尝试解析JSON响应
      const jsonMatch = response.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          guidanceQuestions: parsed.guidanceQuestions || []
        }
      }

      // 如果无法解析JSON，返回默认问题
      return {
        guidanceQuestions: [
          '问题发生的具体场景是什么？',
          '问题出现的频率如何？',
          '是否有特定的触发条件？',
          '问题是否影响了产品功能或性能？'
        ]
      }
    } catch (error) {
      console.error('问题分析失败:', error)
      return {
        guidanceQuestions: [
          '问题发生的具体场景是什么？',
          '问题出现的频率如何？',
          '是否有特定的触发条件？',
          '问题是否影响了产品功能或性能？'
        ]
      }
    }
  }

  /**
   * 分析根本原因
   */
  async analyzeRootCauses(problemDetails: string): Promise<{
    potentialCauses: string[]
    verificationMethods: string[]
  }> {
    const systemPrompt = `你是一位经验丰富的根本原因分析专家。请基于问题描述，分析可能的根本原因，并提供验证方法。
请使用5Why分析法或鱼骨图分析方法。
输出格式必须是JSON，包含potentialCauses数组和verificationMethods数组。`

    const userPrompt = `问题描述详情：${problemDetails}

请分析可能的根本原因，并提供验证方法。请以JSON格式返回：
{
  "potentialCauses": [
    "可能原因1",
    "可能原因2",
    ...
  ],
  "verificationMethods": [
    "验证方法1",
    "验证方法2",
    ...
  ]
}`

    try {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]

      const response = await this.llmClient.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7
      })

      const jsonMatch = response.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          potentialCauses: parsed.potentialCauses || [],
          verificationMethods: parsed.verificationMethods || []
        }
      }

      return {
        potentialCauses: [
          '设计缺陷',
          '制造工艺问题',
          '材料质量问题',
          '操作不当'
        ],
        verificationMethods: [
          '审查设计文档',
          '检查生产记录',
          '进行材料测试',
          '观察操作过程'
        ]
      }
    } catch (error) {
      console.error('根本原因分析失败:', error)
      return {
        potentialCauses: [
          '设计缺陷',
          '制造工艺问题',
          '材料质量问题',
          '操作不当'
        ],
        verificationMethods: [
          '审查设计文档',
          '检查生产记录',
          '进行材料测试',
          '观察操作过程'
        ]
      }
    }
  }

  /**
   * 生成改善措施
   */
  async generateSolutions(rootCause: string): Promise<{
    permanentActions: string[]
    preventiveActions: string[]
  }> {
    const systemPrompt = `你是一位改善措施专家。请基于根本原因，制定永久纠正措施和预防再发生的措施。
输出格式必须是JSON，包含permanentActions数组和preventiveActions数组。`

    const userPrompt = `根本原因：${rootCause}

请制定永久纠正措施和预防再发生的措施。请以JSON格式返回：
{
  "permanentActions": [
    "永久纠正措施1",
    "永久纠正措施2",
    ...
  ],
  "preventiveActions": [
    "预防措施1",
    "预防措施2",
    ...
  ]
}`

    try {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]

      const response = await this.llmClient.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7
      })

      const jsonMatch = response.content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          permanentActions: parsed.permanentActions || [],
          preventiveActions: parsed.preventiveActions || []
        }
      }

      return {
        permanentActions: [
          '修正设计方案',
          '优化生产工艺',
          '更换材料供应商',
          '加强员工培训'
        ],
        preventiveActions: [
          '建立设计评审机制',
          '实施质量管理体系',
          '建立供应商认证体系',
          '定期培训员工'
        ]
      }
    } catch (error) {
      console.error('改善措施生成失败:', error)
      return {
        permanentActions: [
          '修正设计方案',
          '优化生产工艺',
          '更换材料供应商',
          '加强员工培训'
        ],
        preventiveActions: [
          '建立设计评审机制',
          '实施质量管理体系',
          '建立供应商认证体系',
          '定期培训员工'
        ]
      }
    }
  }

  /**
   * 生成完整的8D报告
   */
  async generateReport(reportData: any): Promise<string> {
    const systemPrompt = `你是一位8D报告撰写专家。请基于用户提供的信息，生成一份完整的8D报告。
报告格式清晰，语言专业。`

    const userPrompt = `请基于以下信息生成8D报告：
${JSON.stringify(reportData, null, 2)}`

    try {
      const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]

      const response = await this.llmClient.invoke(messages, {
        model: 'doubao-seed-1-8-251228',
        temperature: 0.7
      })

      return response.content
    } catch (error) {
      console.error('报告生成失败:', error)
      return '报告生成失败，请重试。'
    }
  }
}
