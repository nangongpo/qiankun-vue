<template>
  <div class="about app-container">
    修改用户名：<el-input :value="user.name" style="width: 200px" @input="update" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      username: ''
    }
  },
  computed: {
    ...mapState('global', {
      user: (state) => state.userInfo // 获取父应用的user信息
    })
  },
  methods: {
    ...mapActions('global', ['setGlobalState']),
    update(name) {
      console.log('姓名', name)
      this.setGlobalState({ userInfo: { name }})
    }
  }
}
</script>
