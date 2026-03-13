import { View, Text, Button, Textarea } from '@tarojs/components'
import { useState } from 'react'
import { useReportStore } from '@/stores/report'
import Taro from '@tarojs/taro'
import './index.css'

const Index: React.FC = () => {
  const [problemDescription, setProblemDescription] = useState('')
  const [problemOccurrence, setProblemOccurrence] = useState('')
  const [problemImpact, setProblemImpact] = useState('')
  const [loading, setLoading] = useState(false)

  const updateReport = useReportStore((state) => state.updateReport)

  const handleSubmit = async () => {
    if (!problemDescription.trim()) {
      Taro.showToast({
        title: '请输入问题描述',
        icon: 'none'
      })
      return
    }

    setLoading(true)

    try {
      // 更新报告数据
      updateReport({
        d2ProblemDescription: problemDescription,
        d2ProblemOccurrence: problemOccurrence,
        d2ProblemImpact: problemImpact
      })

      // 跳转到引导页面
      Taro.navigateTo({
        url: '/pages/guide/index'
      })
    } catch (error) {
      console.error('提交失败:', error)
      Taro.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="page-container">
      <View className="header">
        <Text className="header-title">8D问题报告</Text>
        <Text className="header-subtitle">问题描述阶段 (D2)</Text>
      </View>

      <View className="content">
        <View className="form-section">
          <Text className="block form-label">问题描述 *</Text>
          <Text className="block form-hint">请详细描述遇到的问题</Text>
          <View className="textarea-wrapper">
            <Textarea
              className="form-textarea"
              value={problemDescription}
              onInput={(e) => setProblemDescription(e.detail.value)}
              placeholder="例如：产品在使用过程中出现开裂现象，导致无法正常工作"
              maxlength={500}
              showConfirmBar={false}
            />
          </View>
        </View>

        <View className="form-section">
          <Text className="block form-label">问题发生时间</Text>
          <Text className="block form-hint">问题是什么时候首次发现的？</Text>
          <View className="textarea-wrapper">
            <Textarea
              className="form-textarea"
              value={problemOccurrence}
              onInput={(e) => setProblemOccurrence(e.detail.value)}
              placeholder="例如：2024年1月15日首次发现"
              maxlength={200}
              showConfirmBar={false}
            />
          </View>
        </View>

        <View className="form-section">
          <Text className="block form-label">问题影响范围</Text>
          <Text className="block form-hint">问题造成了什么影响？</Text>
          <View className="textarea-wrapper">
            <Textarea
              className="form-textarea"
              value={problemImpact}
              onInput={(e) => setProblemImpact(e.detail.value)}
              placeholder="例如：影响了100台产品，导致客户投诉"
              maxlength={200}
              showConfirmBar={false}
            />
          </View>
        </View>
      </View>

      <View className="footer">
        <Button
          className="submit-btn"
          onClick={handleSubmit}
          loading={loading}
        >
          下一步
        </Button>
      </View>
    </View>
  )
}

export default Index
