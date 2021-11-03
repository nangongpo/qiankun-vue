import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'qiankun-vue2-common/style/index.scss'
import 'qiankun-vue2-common/iconfont/iconfont.css'

import ElementUI from './plugins/element.js'
Vue.use(ElementUI, { size: 'small' })

import './qiankun'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main')
