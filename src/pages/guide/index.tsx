import { View, Text, Button, Textarea } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useReportStore } from '@/stores/report'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import './index.css'

const Guide: React.FC = () => {
  const [guidanceQuestions, setGuidanceQuestions] = useState<string[]>([])
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const report = useReportStore((state) => state.report)
  const updateReport = useReportStore((state) => state.updateReport)

  useEffect(() => {
    fetchGuidanceQuestions()
  }, [])

  const fetchGuidanceQuestions = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/eightd/analyze-problem',
        method: 'POST',
        data: {
          problemDescription: report.d2ProblemDescription,
          problemOccurrence: report.d2ProblemOccurrence,
          problemImpact: report.d2ProblemImpact
        }
      })

      console.log('问题分析响应:', res.data)

      if (res.data.code === 200) {
        setGuidanceQuestions(res.data.data.guidanceQuestions)
        setAnswers(new Array(res.data.data.guidanceQuestions.length).fill(''))
      } else {
        Taro.showToast({
          title: '获取引导问题失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('获取引导问题失败:', error)
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const handleSubmit = async () => {
    if (answers.some((answer) => !answer.trim())) {
      Taro.showToast({
        title: '请回答所有问题',
        icon: 'none'
      })
      return
    }

    setSubmitting(true)

    try {
      const enhancedDescription = `${report.d2ProblemDescription}

补充信息：
${guidanceQuestions.map((q, i) => `${q}\n回答：${answers[i]}`).join('\n\n')}`

      updateReport({
        d2ProblemDescription: enhancedDescription
      })

      Taro.navigateTo({
        url: '/pages/analysis/index'
      })
    } catch (error) {
      console.error('提交失败:', error)
      Taro.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <View className="page-container">
        <View className="loading-container">
          <Text className="loading-text">正在分析问题...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="page-container">
      <View className="header">
        <Text className="header-title">问题引导</Text>
        <Text className="header-subtitle">请回答以下问题，帮助我们更准确地了解问题</Text>
      </View>

      <View className="content">
        {guidanceQuestions.map((question, index) => (
          <View key={index} className="question-section">
            <Text className="block question-label">问题 {index + 1}</Text>
            <Text className="block question-text">{question}</Text>
            <View className="textarea-wrapper">
              <Textarea
                className="answer-textarea"
                value={answers[index]}
                onInput={(e) => handleAnswerChange(index, e.detail.value)}
                placeholder="请输入您的回答"
                maxlength={300}
                showConfirmBar={false}
              />
            </View>
          </View>
        ))}
      </View>

      <View className="footer">
        <Button
          className="submit-btn"
          onClick={handleSubmit}
          loading={submitting}
        >
          下一步
        </Button>
      </View>
    </View>
  )
}

export default Guide
