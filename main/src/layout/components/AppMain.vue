<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view v-if="isMain" :key="$route.path" />
        <div v-else key="micro-container" id="micro-container" class="micro-container"></div>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { registerApps } from '@/qiankun/index'

export default {
  name: 'app-main',
  data() {
    return {
      isMain: false
    }
  },
  computed: {
    menuList() {
      return this.$store.state.permission.menuList
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
    $route(to) {
      this.isMainPage(to)
    }
  },
  created() {
    this.isMainPage(this.$route)
  },
  mounted() {
    this.$nextTick(() => {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true
        registerApps()
      }
    })
  },
  methods: {
    isMainPage(to) {
      const { moduleName } = to?.meta || {}
      this.isMain = moduleName === 'main'
      // 更新侧边栏路由
      const menu = this.menuList.filter((element) => {
        return element.moduleName === moduleName
      })
      if (menu.length) {
        this.$store.commit('permission/UPDATE_SUB_MENU', menu[0].menuList)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - #{$headerHeight});
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: $headerHeight;
}

.hasTagsView {
  .app-main {
    /* 98 = navbar + tags-view = 64 + 34 */
    min-height: calc(100vh - #{$headerHeight + $tagsViewHeight});
  }

  .fixed-header+.app-main {
    padding-top: calc($headerHeight + $tagsViewHeight);
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
