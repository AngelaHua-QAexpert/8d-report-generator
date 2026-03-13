export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '改善措施'
    })
  : { navigationBarTitleText: '改善措施' }
