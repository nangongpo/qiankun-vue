<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <el-menu 
      :default-active="currentModuleName" 
      :active-text-color="variables.theme"
      mode="horizontal" 
      class="menu-container">
      <el-menu-item index="main" @click="toHome">
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="index + 'menus'"
        :index="item.moduleName"
        @click="handleSelect(item)">
        <span slot="title">{{ item.moduleTitle }}</span>
      </el-menu-item>
    </el-menu>
    <div class="right-menu">
      <!-- <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />
        <error-log class="errLog-container right-menu-item hover-effect" />
      </template> -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <i class="el-icon-new-username"></i>
          <span> {{ userName }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">登录信息</el-dropdown-item>
          <el-dropdown-item command="updatePassword">密码修改</el-dropdown-item>
          <el-dropdown-item command="setting">修改用户名</el-dropdown-item>
          <el-dropdown-item divided command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="avatar-container right-menu-item hover-effect" @click="handleCommand('logout')">
        <i class="el-icon-new-exit"></i>
        <span> 退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { homeMenuData } from '@/utils'
import variables from '@/styles/variables.scss'

export default {
  components: { Hamburger },
  data() {
    return {
      variables
    }
  },
  computed: {
    ...mapState({
      currentModuleName: (state) => state.permission.currentModuleName,
      userName: (state) => state.user.userInfo.name,
      menuList: (state) => state.permission.menuList,
      tabsList: (state) => state.tabs.tabsList
    }),
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'fromLogin'
    ])
  },
  watch: {
    $router(to, form) {
      console.log('navbar', to, form)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('device/toggleSideBar')
    },
    handleCommand(command) {
      switch (command) {
        case 'login':
          // this.$store.dispatch('user/getInfo').then(() => {
          //   this.showInfo()
          // })
          break
        case 'updatePassword':
          this.$router.push({ path: '/update-password' })
          break
        case 'setting':
          this.$store.commit('user/UPDATE_USER_INFO_ITEM', { key: 'userInfo', value: { name: 'zhangsan' }})
          this.$actions.setGlobalState({ userInfo: { name: 'zhangsan' }})
          break
        case 'logout':
          this.$router.push('/login')
          // this.logout()
          break
      }
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    toHome() {
      this.$store.commit('tabs/UPDATE_TABS_LIST', homeMenuData)
      this.$store.commit('permission/UPDATE_CURRENT_MODULE_NAME', 'main')
      this.$router.push(`/home`)
    },
    handleSelect(item) {
      if (item.redirect) {
        this.$router.replace({ path: item.redirect })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.qiankun-font {
  font-size: 22px;
  padding-right: 20px;
  line-height: 60px;
}
.menu-icons {
  padding-right: 20px;
  display: flex;
  align-items: center;
  .menu-icon {
    padding: 0 12px;
    cursor: pointer;
    .icon {
      display: inline-block;
      font-size: 18px;
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.el-message-box {
  &.login-info {
    width: 320px;
    margin-top: -25%;
    .el-message-box__header {
      text-align: center;
    }
    .info-wrapper {
      padding: 0 10px;
      font-size: 16px;
      .info-item {
        padding: 5px 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.navbar {
  height: $headerHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: $headerHeight - 4px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .menu-container {
    float: left;
    line-height: $headerHeight;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: $headerHeight;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      padding-right: 15px;

      .avatar-wrapper {

        .el-avatar {
          vertical-align: middle;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
          vertical-align: bottom;
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>
