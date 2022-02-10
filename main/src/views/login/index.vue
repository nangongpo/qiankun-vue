<template>
  <login-wrapper>
    <div class="login-form">
      <div class="title">用户登陆</div>
      <el-form
        ref="loginForm"
        size="medium"
        :rules="loginRules"
        :model="loginForm"
        :show-message="false">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model.trim="loginForm.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            auto-complete="off"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model.trim="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            auto-complete="new-password"
            :show-password="true"
            @keyup.enter.native="!authPng ? submitForm('loginForm') : undefined"/>
        </el-form-item>
        <el-form-item prop="auth_code" v-if="authPng">
          <el-input
            v-model.trim="loginForm.auth_code"
            placeholder="验证码"
            prefix-icon="el-icon-lock"
            auto-complete="new-password"
            @keyup.enter.native="submitForm('loginForm')">
            <template #suffix>
              <div @click="updateCodePng(new Date().getTime())">
                <img v-show="authPng" :src="authPng" class="auth-code">
                <div v-show="!authPng" class="auth-code">获取验证码</div>
              </div>
            </template>
          </el-input>
        </el-form-item>
        <div class="checkbox">
          <el-checkbox v-model="checked" @change="(checked) => saveUsername(loginForm.username, checked)">记住用户名</el-checkbox>
        </div>
        <el-form-item class="button">
          <el-button :loading="loading" type="primary" round @click.native.prevent="submitForm('loginForm')">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </login-wrapper>
</template>

<script>
import LoginWrapper from './components/login-wrapper'
import { projectName } from '@/settings'
// import { rsa } from '@/utils/encrypt.js'
import { axiosGet } from '@/api/user'

export default {
  name: 'login',
  components: { LoginWrapper },
  data() {
    return {
      checked: false,
      loading: false,
      authPng: '',
      authKey: '',
      loginForm: {
        username: '',
        password: '',
        auth_code: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        auth_code: []
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // this.updateCodePng(new Date().getTime())
  },
  mounted() {
    this.loginForm.username = this.saveUsername()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
    // 下发信息
    sessionStorage.removeItem('currentMenu')
    sessionStorage.removeItem('currentPage')
    this.$actions.setGlobalState({ userInfo: { name: 'lizhijie429' }})
  },
  methods: {
    updateCodePng(timestamp) {
      axiosGet('/auth_code/', { key: timestamp }).then(response => {
        if (response.status === 204) {
          this.loginRules['auth_code'] = []
        } else {
          this.authPng = `data:image/png;base64,${response.data.data}`
          this.authKey = timestamp
          this.loginRules['auth_code'] = [{ required: true, message: '请输验证码', trigger: 'blur' }]
        }
      }).catch(() => {
        this.loginRules = {}
      })
    },
    submitForm(formName) {
      this.toHome()
      // this.$refs[formName].validate(async(valid, error) => {
      //   const { username, password, auth_code } = this.loginForm
      //   if (!valid) {
      //     const messageList = Object.keys(error).reduce((t, v) => [...t, ...error[v]], [])
      //     return messageList.length && this.$message({
      //       message: messageList[0].message
      //     })
      //   }
      //   this.saveUsername(username)
      //   this.loading = true
      //   const params = {
      //     username,
      //     password: rsa(password),
      //     auth_code,
      //     auth_key: this.authKey
      //   }
      //   this.$store.dispatch('user/login', params).then(result => {
      //     this.loading = false
      //     this.$router.push({ path: '/' })
      //   }).catch(() => {
      //     this.loading = false
      //   })
      // })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    saveUsername(username, checked) {
      const key = projectName + '_username'
      if (username === '' || checked === false) {
        return localStorage.removeItem(key)
      }
      if (username) {
        return localStorage.setItem(key, username)
      }
      const old_username = localStorage.getItem(key) || ''
      if (old_username) this.checked = true
      return old_username
    },
    // 跳转首页
    toHome() {
      this.$router.push(process.env.VUE_APP_DEFAULT_APP)
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/login.scss';
</style>
