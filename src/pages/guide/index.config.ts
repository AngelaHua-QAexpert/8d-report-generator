export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '问题引导'
    })
  : { navigationBarTitleText: '问题引导' }
