<template>
  <div class="home">
    <h1>应用跳转页面</h1>
    <el-button type="primary" @click="jumpPage('/login', 'main')">跳转登录页</el-button>
    <el-button type="primary" @click="jumpPage('/home', 'main')">跳转首页</el-button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'sub01Home',
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    }
  },
  components: {},
  computed: {
    ...mapState('global', {
      tabsList: (state) => state.tabsList
    })
  },
  methods: {}
}
</script>
