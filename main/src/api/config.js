import Vue from 'vue'
import store from '@/store'
import { debounce } from '@/utils'
import axios from 'axios'
import { nanoid } from 'nanoid'

import { MessageBox } from 'element-ui'

// 创建axios实例 (VUE_APP_BASE_API 开发环境的配置在 .env.development、生产环境的配置在 .env.production)
const domain = process.env.NODE_ENV === 'production' ? '' : ''
const service = axios.create({
  baseURL: domain + process.env.VUE_APP_BASE_API,
  withCredentials: false,
  timeout: 30000
})

let loading
let needLoadingRequestCount = 0

function startLoading(options = {}) {
  if (options.show) {
    loading = Vue.prototype.$loading({
      lock: true,
      text: '加载中…',
      background: 'rgba(0, 0, 0, 0.7)',
      ...options
    })
  }
}
const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    loading && loading.close()
  }
}

export function showFullScreenLoading(options) {
  if (needLoadingRequestCount === 0) {
    startLoading(options)
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    debounce(tryCloseLoading, 300)()
  }
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    const hash = window.location.href.split('#')[1]
    const headers = {
      'Content-Security-Policy': "default-src 'self'; script-src 'self'; frame-ancestors 'self';object-src 'none'",
      'X-Token': store.state.user.token || null,
      'X-Request-Trace-Id': nanoid(12),
      'Hash': hash && hash.indexOf('?') > -1 ? hash.split('?')[0] : hash
    }
    config.headers = { ...config.headers, ...headers }
    showFullScreenLoading(config.loading)
    return config
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading(response.config.loading)
    const { data_type, response_data, code, msg, timestamp } = response.data || {}

    if (timestamp) store.commit('user/SET_TIME', timestamp)

    if (data_type === '2') {
      const codeRules = {
        1005: '您已经登出，您可以取消停留在此页面，或再次登录'
      }
      if (code === '1005') {
        MessageBox.confirm(codeRules[code], '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/logout').then(() => {
            window.location.reload()
          })
        }).catch(() => {})
      }
      return Promise.reject({ ...response, message: msg })
    }

    return {
      ...response,
      ok: data_type === '1',
      data: response_data || response || {},
      msg
    }
  },
  error => {
    const newError = { ...error }
    if (!error.response) {
      if (error.message.indexOf('timeout') === 0) {
        newError.message = '由于网络太长时间没有回应，操作已经超时'
      } else {
        newError.message = '您当前网络无法正常连接到服务器'
      }
    }
    const { data, statusText } = newError.response
    if (!newError.message) newError.message = data || statusText
    tryHideFullScreenLoading()
    return Promise.reject(newError)
  }
)

export default service
