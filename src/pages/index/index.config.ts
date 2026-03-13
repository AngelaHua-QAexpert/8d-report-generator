export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '8D报告'
    })
  : { navigationBarTitleText: '8D报告' }
