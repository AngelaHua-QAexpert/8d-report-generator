import { View, Text, Button, Textarea, Checkbox, CheckboxGroup } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useReportStore } from '@/stores/report'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import './index.css'

const Solution: React.FC = () => {
  const [permanentActions, setPermanentActions] = useState<string[]>([])
  const [preventiveActions, setPreventiveActions] = useState<string[]>([])
  const [selectedPermanentActions, setSelectedPermanentActions] = useState<number[]>([])
  const [selectedPreventiveActions, setSelectedPreventiveActions] = useState<number[]>([])
  const [customPermanentAction, setCustomPermanentAction] = useState('')
  const [customPreventiveAction, setCustomPreventiveAction] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const report = useReportStore((state) => state.report)
  const updateReport = useReportStore((state) => state.updateReport)

  useEffect(() => {
    generateSolutions()
  }, [])

  const generateSolutions = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/eightd/generate-solutions',
        method: 'POST',
        data: {
          rootCause: report.d4RootCause
        }
      })

      console.log('改善措施生成响应:', res.data)

      if (res.data.code === 200) {
        setPermanentActions(res.data.data.permanentActions)
        setPreventiveActions(res.data.data.preventiveActions)
      } else {
        Taro.showToast({
          title: '生成失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('生成失败:', error)
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePermanentActionChange = (e: any) => {
    setSelectedPermanentActions(e.detail.value.map((v: string) => parseInt(v)))
  }

  const handlePreventiveActionChange = (e: any) => {
    setSelectedPreventiveActions(e.detail.value.map((v: string) => parseInt(v)))
  }

  const handleSubmit = async () => {
    const finalPermanentActions = [
      ...selectedPermanentActions.map((i) => permanentActions[i]),
      ...(customPermanentAction.trim() ? [customPermanentAction] : [])
    ]

    const finalPreventiveActions = [
      ...selectedPreventiveActions.map((i) => preventiveActions[i]),
      ...(customPreventiveAction.trim() ? [customPreventiveAction] : [])
    ]

    if (finalPermanentActions.length === 0) {
      Taro.showToast({
        title: '请至少选择或输入一项永久纠正措施',
        icon: 'none'
      })
      return
    }

    setSubmitting(true)

    try {
      updateReport({
        d5PermanentActions: finalPermanentActions,
        d7SystemicChanges: finalPreventiveActions
      })

      Taro.navigateTo({
        url: '/pages/report/index'
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
          <Text className="loading-text">正在生成改善措施...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="page-container">
      <View className="header">
        <Text className="header-title">改善措施</Text>
        <Text className="header-subtitle">D5/D7 - 制定永久纠正措施和预防措施</Text>
      </View>

      <View className="content">
        <View className="section">
          <Text className="block section-title">永久纠正措施 (D5)</Text>
          <Text className="block section-hint">请选择或输入永久纠正措施</Text>

          <CheckboxGroup onChange={handlePermanentActionChange}>
            {permanentActions.map((action, index) => (
              <View key={index} className="action-item">
                <Checkbox
                  value={index.toString()}
                  checked={selectedPermanentActions.includes(index)}
                  color="#667eea"
                />
                <Text className="action-text">{action}</Text>
              </View>
            ))}
          </CheckboxGroup>

          <View className="textarea-wrapper">
            <Textarea
              className="custom-textarea"
              value={customPermanentAction}
              onInput={(e) => setCustomPermanentAction(e.detail.value)}
              placeholder="输入自定义永久纠正措施"
              maxlength={300}
              showConfirmBar={false}
            />
          </View>
        </View>

        <View className="section">
          <Text className="block section-title">预防再发生措施 (D7)</Text>
          <Text className="block section-hint">请选择或输入预防措施</Text>

          <CheckboxGroup onChange={handlePreventiveActionChange}>
            {preventiveActions.map((action, index) => (
              <View key={index} className="action-item">
                <Checkbox
                  value={index.toString()}
                  checked={selectedPreventiveActions.includes(index)}
                  color="#667eea"
                />
                <Text className="action-text">{action}</Text>
              </View>
            ))}
          </CheckboxGroup>

          <View className="textarea-wrapper">
            <Textarea
              className="custom-textarea"
              value={customPreventiveAction}
              onInput={(e) => setCustomPreventiveAction(e.detail.value)}
              placeholder="输入自定义预防措施"
              maxlength={300}
              showConfirmBar={false}
            />
          </View>
        </View>
      </View>

      <View className="footer">
        <Button
          className="submit-btn"
          onClick={handleSubmit}
          loading={submitting}
        >
          生成报告
        </Button>
      </View>
    </View>
  )
}

export default Solution
