import router from '@/router/index'
const tabs = {
  state: () => ({
    tabsList: []
  }),
  mutations: {
    // 新增tabs
    UPDATE_TABS_LIST(state, payload) {
      if (state.tabsList.length < 10) {
        const hasTabsItem = state.tabsList.filter((item) => {
          return item.name === payload.name
        })
        if (!hasTabsItem.length) {
          state.tabsList.push(payload)
        }
        router.push({ path: payload.path })
      }
    }
  },
  actions: {
    // 删除最后一个tabs标签
    REMOVE_LAST_TAB({ state, commit }, payload) {
      if (state.tabsList.length > 1) {
        // 第一步、删除
        state.tabsList.forEach((item, index) => {
          if (item.name === payload.name) {
            state.tabsList.splice(index, 1)
          }
        })
        // 第二步、获取最后一个tabs的name跳转路由
        const index = state.tabsList.length - 1
        const lastTabsItem = state.tabsList[index]
        commit('UPDATE_CURRENT_PAGE', lastTabsItem.path)
        router.push({ path: lastTabsItem.path })
      }
    },
    // 删除除了第一个跟最后一个以外得任何一个tab标签
    REMOVE_ANY_TAB({ state, commit }, payload) {
      const { tabsItem, indexOf } = payload
      const tabsListLength = state.tabsList.length
      if (state.tabsList.length > 1 && indexOf < tabsListLength) {
        // 第一步：执行删除操作
        state.tabsList.forEach((item, index) => {
          if (item.name === tabsItem.name) {
            state.tabsList.splice(index, 1)
          }
        })
        // 第二步：获取删除后面的tabs的name并跳转路由
        const index = indexOf - 1
        const nextTabsItem = state.tabsList[index]
        commit('UPDATE_CURRENT_PAGE', nextTabsItem.path)
        router.push({ path: nextTabsItem.path })
      }
    }
  }
}
export default tabs
