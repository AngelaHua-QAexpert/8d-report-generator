import { View, Text, Button, ScrollView } from '@tarojs/components'
import { useState, useEffect } from 'react'
import { useReportStore } from '@/stores/report'
import { Network } from '@/network'
import Taro from '@tarojs/taro'
import './index.css'

const Report: React.FC = () => {
  const [reportContent, setReportContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [regenerating, setRegenerating] = useState(false)

  const report = useReportStore((state) => state.report)
  const resetReport = useReportStore((state) => state.resetReport)

  useEffect(() => {
    generateReport()
  }, [])

  const generateReport = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/eightd/generate-report',
        method: 'POST',
        data: report
      })

      console.log('报告生成响应:', res.data)

      if (res.data.code === 200) {
        setReportContent(res.data.data.report)
      } else {
        Taro.showToast({
          title: '报告生成失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('报告生成失败:', error)
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegenerate = () => {
    setRegenerating(true)
    generateReport().finally(() => {
      setRegenerating(false)
    })
  }

  const handleCopy = () => {
    Taro.setClipboardData({
      data: reportContent,
      success: () => {
        Taro.showToast({
          title: '已复制到剪贴板',
          icon: 'success'
        })
      }
    })
  }

  const handleNewReport = () => {
    Taro.showModal({
      title: '确认',
      content: '确定要创建新的8D报告吗？当前报告将被清空。',
      success: (res) => {
        if (res.confirm) {
          resetReport()
          Taro.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  }

  if (loading) {
    return (
      <View className="page-container">
        <View className="loading-container">
          <Text className="loading-text">正在生成8D报告...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="page-container">
      <View className="header">
        <Text className="header-title">8D报告</Text>
        <Text className="header-subtitle">问题已解决，报告已生成</Text>
      </View>

      <View className="content">
        <ScrollView scrollY className="report-scroll">
          <View className="report-content">
            <Text className="report-text">{reportContent}</Text>
          </View>
        </ScrollView>
      </View>

      <View className="footer">
        <View className="button-group">
          <Button
            className="action-btn"
            onClick={handleRegenerate}
            loading={regenerating}
          >
            重新生成
          </Button>
          <Button
            className="action-btn secondary"
            onClick={handleCopy}
          >
            复制报告
          </Button>
        </View>
        <Button
          className="new-btn"
          onClick={handleNewReport}
        >
          创建新报告
        </Button>
      </View>
    </View>
  )
}

export default Report
