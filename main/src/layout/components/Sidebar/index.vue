<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="currentPage"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item :sub-menu="subMenu"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { Logo, SidebarItem },
  computed: {
    ...mapState({
      subMenu: state => state.permission.subMenu,
      currentPage: state => state.permission.currentPage,
      tabsList: state => state.tabs.tabsList,
      showLogo: state => state.settings.sidebarLogo
    }),
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
  }
}
</script>
