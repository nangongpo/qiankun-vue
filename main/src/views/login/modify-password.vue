<template>
  <login-wrapper title="">
    <div class="login-form">
      <div class="title">密码修改</div>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        :show-message="false">
        <el-form-item label="" prop="password">
          <el-input
            v-model.trim="ruleForm.password"
            type="password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            placeholder="请输入原密码"
            clearable
            show-password />
        </el-form-item>
        <el-form-item label="" prop="tmp_password">
          <el-input
            v-model.trim="ruleForm.tmp_password"
            type="password"
            auto-complete="new-password"
            prefix-icon="el-icon-lock"
            placeholder="请输入新密码"
            clearable
            show-password />
        </el-form-item>
        <el-form-item label="" prop="new_password">
          <el-input
            v-model.trim="ruleForm.new_password"
            type="password"
            auto-complete="new-password"
            prefix-icon="el-icon-lock"
            placeholder="请再次输入新密码"
            clearable
            show-password
            @keyup.enter.native="submitForm('ruleForm')" />
        </el-form-item>
        <el-form-item class="button">
          <el-button
            :loading="loading"
            type="primary"
            round
            @click.native.prevent="submitForm('ruleForm')">
            密码修改
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </login-wrapper>
</template>

<script>
import LoginWrapper from './components/login-wrapper'
import { rsa } from '@/utils/encrypt.js'
export default {
  name: 'modify-password',
  components: { LoginWrapper },
  data() {
    return {
      loading: false,
      ruleForm: {},
      rules: {
        password: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        tmp_password: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ],
        new_password: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value) {
                if (value === '') {
                  callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.tmp_password) {
                  callback(new Error('两次输入密码不一致!'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('请再次输入密码'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          this.loading = true
          const { password, new_password } = this.ruleForm
          const params = {
            password: rsa(password),
            new_password: rsa(new_password)
          }
          this.$store.dispatch('user/updatePassword', params).then(() => {
            this.loading = false
            this.$msgbox({
              title: '密码修改成功',
              confirmButtonText: '去登录',
              closeOnClickModal: false,
              closeOnPressEscape: false,
              showClose: false,
              center: true,
              type: 'success',
              roundButton: true,
              customClass: 'modify-password-tooltip',
              callback: () => {
                this.$store.dispatch('user/logout').then(() => {
                  window.location.reload()
                })
              }
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<style lang="scss">
@import '~@/styles/login.scss';
</style>
