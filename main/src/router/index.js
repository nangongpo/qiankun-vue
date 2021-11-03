import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

// 路由
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isTabs: false, isSide: false, isMain: true }
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: process.env.VUE_APP_DEFAULT_APP, // 默认加载的路由
    meta: { isTabs: false, isSide: false, isMain: true },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { isTabs: false, isSide: false, isMain: true }
      }
    ]
  }
]

const createRouter = () => {
  return new VueRouter({
    mode: 'history',
    routes: constantRoutes,
    isAddAsyncMenuData: false
  })
}

// 处理重复点击同一个路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

const router = createRouter()
/**
 * 重置注册的路由导航map
 * 主要是为了通过addRoutes方法动态注入新路由时，避免重复注册相同name路由
 */
const resetRouter = () => {
  const newRouter = createRouter()
  router && (router.matcher = newRouter.matcher)
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/home') {
    sessionStorage.removeItem('currentMenu')
    sessionStorage.removeItem('currentPage')
    store.commit('UPDATE_CURRENT_MODULE_NAME', 'home')
    store.commit('UPDATE_SUB_MENU', true)
  }
  if (!router.options.isAddAsyncMenuData) {
    store.dispatch('generateRoutes').then((accessRoutes) => {
      // 根据用户权限生成可访问的路由表
      for (let i = 0, length = accessRoutes.length; i < length; i += 1) {
        const element = accessRoutes[i]
        router.addRoute(element)
      }
      router.options.isAddAsyncMenuData = true
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export { constantRoutes, resetRouter }

export default router