import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from 'qiankun-vue2-common'

import ElementUI from './plugins/element.js'

Vue.mixin({
  methods: {
    jumpPage(path, moduleName) {
      // 通知主应用发生了页面跳转
      this.$setGlobalState({
        currentRoute: { currentPage: path, currentModuleName: moduleName }
      })
    }
  }
})

Vue.config.productionTip = false

let instance = null
function render(props = {}) {
  const { container, setGlobalState } = props
  Vue.use(ElementUI, { size: 'small' })
  Vue.prototype.$setGlobalState = setGlobalState

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap(props) {
  // console.log('[vue] vue app bootstraped', props)
}
export async function mount(props) {
  // console.log('[vue] props from main framework', props)
  common.initGlobalState(store, props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
