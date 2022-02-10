<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ projectTitle }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { projectTitle } from '@/settings'
import logo from '@/assets/logo.png'
export default {
  name: 'sidebar-logo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      projectTitle,
      logo
    }
  }
}
</script>

<style  lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  width: 100%;
  height: $pageTitleHeight;
  text-align: center;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    padding: 20px;

    & .sidebar-logo {
      width: 50px;
      padding-bottom: 10px
    }

    & .sidebar-title {
      margin: 0;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      line-height: 24px;
    }
  }

  &.collapse {
    height: $headerHeight;
    line-height: $headerHeight;
    & .sidebar-logo-link {
      padding: 0;
      & .sidebar-logo {
        padding: 8px;
        vertical-align: middle;
      }
    }
  }
}
</style>
