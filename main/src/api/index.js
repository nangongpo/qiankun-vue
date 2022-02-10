import Vue from 'vue'
import Request from './config'
const Message = (opts) => Vue.prototype.$message({ type: 'info', duration: 5000, ...opts })

/**
 * 公用请求
 * @param {object} options { url, method, params, header, config }
 * {
    * url @param {string} 请求地址
    * method @param {string} 请求方法
    * params @param {object} 请求参数
    * headers @param {object} 自定义请求头, 如上传文件 { 'Content-Type': 'multipart/form-data' }
    * config @param {object} 自定义配置项 默认开启请求loading{ showLoading: true }
 * }
 * @returns {promise}
 */
export function sendRequest(options = {}) {
  const {
    url = '/gateway/',
    method = '',
    params = {},
    config = {}
  } = options
  const isUrlParams = /(get|delete|head)/.test(method)
  const _params = isUrlParams ? params : {}
  const _data = isUrlParams ? {} : params
  const flag = isUrlParams ? url.length === 0 : url.length === 0 && _data
  if (flag) return Message({ message: '请求参数丢失', type: 'error' })
  // 构造请求参数
  const baseConfig = { method, url, params: _params, data: _data }
  return new Promise((resolve, reject) => {
    Request({
      ...baseConfig,
      ...config
    }).then((response) => {
      resolve(response)
    }).catch(error => {
      console.log(error)
      const headers = error.config.headers
      const errorCode = headers['X-Request-Trace-Id']
      Message({
        dangerouslyUseHTMLString: true,
        message: `<div style="line-height: 1.6">
          <span style="font-size: 16px;color: #000">消息详情：${error.message}</span><br />
          <span style="font-size: 12px">消息代码：${errorCode}</span>
        </div>`
      })
      resolve({ ok: false, msg: error.message })
    })
  })
}

// get请求
export function axiosGet(params = {}, config = {}) {
  return sendRequest({
    method: 'get',
    params,
    config
  })
}

// post请求
export function axiosPost(params = {}, config = {}) {
  return sendRequest({
    method: 'post',
    params,
    config
  })
}

// 上传文件
export function uploadFile(params = {}, config = {}) {
  return sendRequest({
    method: 'post',
    params,
    config: {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    }
  })
}

// 获取导入进度
export function progressRequest({ params, callback }, progressStop) {
  const { file_name, state, request_id } = params
  return axiosPost({ method: 'control.vehicle.batch.dml', state: 'number', request_id }).then(res => {
    const { number, success_number, total_number, msg, is_repeat, show_info } = res.data
    if (res.ok) {
      const percentage = total_number ? parseInt((number / total_number) * 100) : total_number
      const result = {
        state,
        filename: `${file_name.split('.')[0]}（${number}/${total_number}）`,
        percentage,
        message: msg,
        request_id,
        label: msg ? '下载错误excel' : '',
        is_repeat,
        visible: !progressStop
      }
      if (!progressStop && !msg && number < total_number) {
        return callback && callback({
          result,
          show_info
        })
      }
      if (number === total_number) {
        const message = Object.prototype.hasOwnProperty.call(res.data, 'success_number') ? `共${total_number}条, 导入成功${success_number}条，失败${total_number - success_number}条` : `导出${total_number}条`
        callback && callback({
          result,
          show_info,
          message
        })
      }
    }
  })
}
