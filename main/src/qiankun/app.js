import props from './share'

// 获取子应用列表
const microApps = []
const appsConfig = process.env
for (const item in appsConfig) {
  if (item.includes('VUE_APP_CHILD_')) {
    const name = item.split('VUE_APP_CHILD_')[1]
    const appItem = {
      name,
      entry: process.env[item],
      activeRule: `/${name}`
    }
    microApps.push(appItem)
  }
}

// 下发数据封装
const apps = microApps.map((item) => {
  return {
    ...item,
    container: '#micro-container', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: props.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps