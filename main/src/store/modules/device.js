import Cookies from 'js-cookie'
import styles from '@/styles/variables.scss'

const headerHeight = parseInt(styles.headerHeight || 50)

const state = {
  screenSize: {
    width: document.body.clientWidth,
    height: window.innerHeight
  },
  appMainHeight: window.innerHeight - headerHeight,
  deviceType: 'desktop', // 设备类型 —— desktop、mobile
  browserType: '', // 浏览器类型 —— 支付宝内置、微信内置、pc(其他)
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  size: Cookies.get('size') || 'medium'
}
const mutations = {
  setDeviceState: (state, data) => {
    Object.keys(data).map(item => {
      state[item] = data[item]
    })
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, deviceType) => {
    state.deviceType = deviceType
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}
const actions = {
  getDeviceData: ({ commit, state }) => {
    const navigator = window.navigator
    const userAgent = navigator.userAgent
    let browserType = ''
    // 判断浏览器类型
    if (/AlipayClient/.test(userAgent)) {
      browserType = 'Alipay'
    } else if (/MicroMessenger/.test(userAgent)) {
      browserType = 'WeChat'
    } else if (/QQBrowser/.test(userAgent)) {
      browserType = 'QQ'
    } else if (/UCBrowser/.test(userAgent)) {
      browserType = 'UC'
    } else {
      const isOpera = userAgent.indexOf('Opera') > -1
      if (isOpera) {
        browserType = 'Opera'
      }
      if (userAgent.indexOf('Firefox') > -1) {
        browserType = 'FF'
      }
      if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1) {
        browserType = 'Chrome'
      }
      if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
        browserType = 'Safari'
      }
      if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
        browserType = 'IE'
      }
    }
    commit('setDeviceState', { browserType })
    // pc端监听屏幕尺寸变化
    if (state.deviceType === 'desktop') {
      window.onresize = () => {
        return (() => {
          const screenSize = {
            width: document.documentElement.clientWidth || document.body.clientWidth,
            height: document.documentElement.clientHeight || document.body.clientHeight
          }
          const appMainHeight = screenSize.height - headerHeight
          commit('setDeviceState', { screenSize, appMainHeight })
        })()
      }
    }
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, deviceType) {
    commit('TOGGLE_DEVICE', deviceType)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
