import { View, Text, Button, Textarea, Radio, RadioGroup } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useReportStore } from '@/stores/report'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import './index.css'

const Analysis: React.FC = () => {
  const [potentialCauses, setPotentialCauses] = useState<string[]>([])
  const [verificationMethods, setVerificationMethods] = useState<string[]>([])
  const [selectedCauseIndex, setSelectedCauseIndex] = useState<number | null>(null)
  const [customCause, setCustomCause] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const report = useReportStore((state) => state.report)
  const updateReport = useReportStore((state) => state.updateReport)

  useEffect(() => {
    analyzeRootCauses()
  }, [])

  const analyzeRootCauses = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/eightd/analyze-root-causes',
        method: 'POST',
        data: {
          problemDetails: report.d2ProblemDescription
        }
      })

      console.log('根本原因分析响应:', res.data)

      if (res.data.code === 200) {
        setPotentialCauses(res.data.data.potentialCauses)
        setVerificationMethods(res.data.data.verificationMethods)
      } else {
        Taro.showToast({
          title: '分析失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('分析失败:', error)
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCauseSelect = (e: any) => {
    setSelectedCauseIndex(parseInt(e.detail.value))
    setCustomCause('')
  }

  const handleSubmit = async () => {
    if (selectedCauseIndex === null && !customCause.trim()) {
      Taro.showToast({
        title: '请选择或输入根本原因',
        icon: 'none'
      })
      return
    }

    setSubmitting(true)

    try {
      const rootCause = selectedCauseIndex !== null
        ? potentialCauses[selectedCauseIndex]
        : customCause

      updateReport({
        d4PotentialCauses: potentialCauses,
        d4RootCause: rootCause,
        d4VerificationMethod: selectedCauseIndex !== null
          ? verificationMethods[selectedCauseIndex] || ''
          : ''
      })

      Taro.navigateTo({
        url: '/pages/solution/index'
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
          <Text className="loading-text">正在分析根本原因...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="page-container">
      <View className="header">
        <Text className="header-title">根本原因分析</Text>
        <Text className="header-subtitle">D4 - 确认根本原因</Text>
      </View>

      <View className="content">
        <View className="section">
          <Text className="block section-title">可能原因分析</Text>
          <Text className="block section-hint">请选择最可能的根本原因</Text>

          <RadioGroup onChange={handleCauseSelect}>
            {potentialCauses.map((cause, index) => (
              <View key={index} className="cause-item">
                <Radio
                  value={index.toString()}
                  checked={selectedCauseIndex === index}
                  color="#667eea"
                />
                <Text className="cause-text">{cause}</Text>
              </View>
            ))}
          </RadioGroup>
        </View>

        <View className="section">
          <Text className="block section-title">或输入自定义原因</Text>
          <View className="textarea-wrapper">
            <Textarea
              className="custom-textarea"
              value={customCause}
              onInput={(e) => {
                setCustomCause(e.detail.value)
                setSelectedCauseIndex(null)
              }}
              placeholder="如果上述原因不符合，请输入您的判断"
              maxlength={500}
              showConfirmBar={false}
            />
          </View>
        </View>

        {selectedCauseIndex !== null && verificationMethods[selectedCauseIndex] && (
          <View className="section">
            <Text className="block section-title">验证方法</Text>
            <View className="verification-card">
              <Text className="block verification-text">
                {verificationMethods[selectedCauseIndex]}
              </Text>
            </View>
          </View>
        )}
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

export default Analysis
