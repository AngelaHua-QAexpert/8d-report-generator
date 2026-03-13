export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '根本原因分析'
    })
  : { navigationBarTitleText: '根本原因分析' }
