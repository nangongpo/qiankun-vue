<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RightPanel from '@/components/RightPanel'
import { getLastLevelNode, homeMenuData } from '@/utils'
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      menuList: (state) => state.permission.menuList,
      tabsList: (state) => state.tabs.tabsList,
      sidebar: state => state.device.sidebar,
      device: state => state.device.deviceType,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      // 初始化全局下发的数据
      this.$actions.setGlobalState({
        userInfo: this.$store.state.user.userInfo,
        globalConfig: this.$store.state.user.globalConfig,
        routers: this.$store.state.permission.routers
      })
      // 获取页面持久化数据
      const currentPage = sessionStorage.getItem('currentPage')
      const currentApp = sessionStorage.getItem('currentApp')
      // 处理关闭前页面是首页的情况
      if (currentApp && currentApp === 'main' && currentPage && currentPage === '/home') {
        this.$store.commit('permission/UPDATE_SUB_MENU', true)
        this.$store.commit('permission/UPDATE_CURRENT_MODULE_NAME', 'main')
        this.$store.commit('tabs/UPDATE_TABS_LIST', homeMenuData)

        return false
      }
      // 处理关闭前非首页页面持久化逻辑
      if (currentPage && currentApp && currentApp !== 'main') {
      // 获取左侧菜单数据
        const menu = this.menuList.filter((element) => {
          return element.moduleName === currentApp
        })
        this.$store.commit('permission/UPDATE_SUB_MENU', menu[0].menuList)
        // 跳转页面
        const pages = getLastLevelNode(menu[0].menuList)
        if (Array.isArray(pages)) {
          const page = pages.filter((element) => {
            return element.path === currentPage
          })
          this.$store.commit('tabs/UPDATE_TABS_LIST', page[0])
        }
      } else {
        this.$store.commit('permission/UPDATE_SUB_MENU', true)
        this.$store.commit('tabs/UPDATE_TABS_LIST', homeMenuData)
      }
    },
    handleClickOutside() {
      this.$store.dispatch('device/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$sideBarMinWidth})
}

.mobile .fixed-header {
  width: 100%;
}
</style>
