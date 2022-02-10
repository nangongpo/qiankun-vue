import { sendRequest } from './index'

function axiosPost(content = {}, config = {}) {
  return sendRequest({
    url: '/gateway/',
    method: 'post',
    params: {
      method: 'control.vehicle.user.server',
      content
    },
    config
  })
}

export function axiosGet(url, params) {
  return sendRequest({
    url,
    method: 'get',
    params
  })
}

export function login(data) {
  return axiosPost({
    state: 'login',
    ...data
  })
}

export function logout() {
  return axiosPost({
    state: 'logout'
  })
}

export function getInfo() {
  return axiosPost({
    state: 'check'
  })
}

export function updatePassword(data) {
  return axiosPost({
    state: 'update',
    ...data
  })
}
