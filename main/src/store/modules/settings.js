import Cookies from 'js-cookie'
import variables from '@/styles/element-variables.scss'
import settings from '@/settings'

const cookieKey = `${settings.projectName}_settings`

const userSetting = Cookies.get(cookieKey) ? JSON.parse(Cookies.get(cookieKey)) : settings

const { theme, showSettings, tagsView, fixedHeader, sidebarLogo } = userSetting

const state = {
  theme: theme || variables.theme,
  showSettings,
  tagsView,
  fixedHeader,
  sidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 修改前判断是否有用户设置
    if (Object.prototype.hasOwnProperty.call(state, key)) {
      state[key] = value
    }
    // 每次改变设置都保存
    Cookies.set(cookieKey, JSON.stringify(state))
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

