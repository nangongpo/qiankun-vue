import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from './plugins/element.js'
import './styles/global.scss'

Vue.use(ElementUI, { size: 'small' })

import { qiankunActions } from './qiankun/index'
Vue.prototype.$actions = qiankunActions

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#main')
