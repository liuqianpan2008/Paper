<template>
  <n-card title="登录"
          id="login">
    <n-form :show-require-mark="false"
            :model="loginV"
            :rules="rules"
            ref="loginRef">
      <n-form-item label="用户名"
                   path="user">
        <n-input placeholder="输入用户名"
                 v-model:value="loginV.user" />
      </n-form-item>
      <n-form-item label="密码"
                   path="passworld">
        <n-input type="password"
                 show-password-on="mousedown"
                 placeholder="请输入密码"
                 v-model:value="loginV.passworld" />
      </n-form-item>
      <Verify @success="success"
              mode="pop"
              captchaType="clickWord"
              :imgSize="{width:'400px',height:'200px'}"
              ref="verify">
      </Verify>
      <n-space justify="end">
        <n-form-item>
          <n-space>
            <n-button @click="Retrieve"
                      attr-type="button">找回密码</n-button>
            <n-button @click="login"
                      attr-type="button">登录</n-button>
          </n-space>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>
</template>
<script lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { FormItemRule, useMessage, useNotification } from 'naive-ui'
import Verify from '../verifition/Verify.vue'
import Global from '../../Global.vue'
import config from '@/config/index'
export default {
  components: { Verify },
  setup() {
    const loginV = ref({ user: '', passworld: '', Code: '' })
    const loginRef = ref()
    const message = useMessage()
    const notification = useNotification()
    const login = () => {
      loginRef.value.validate(async (errors: any) => {
        if (!errors) {
          verify.value.show()
        }
      })
    }
    const Retrieve = () => {
      location.href = './#/Retrieve'
    }
    // 验证码
    const verify = ref()
    const success = (params) => {
      console.log(params)
      axios
        .post(config.baseURL + '/users/Login', {
          user: loginV.value.user,
          password: loginV.value.passworld,
          cod: params,
        })
        .then((response) => {
          const info = response.data
          if (!info.flag) {
            message.error(info.msg)
          } else {
            console.log(info.date)
            localStorage.setItem('Token', info.date)
            localStorage.setItem('user', loginV.value.user)
            Global.IsLog.value = true
            message.success(info.msg)
            location.href = './#/'
            location.reload()
          }
        })
        .catch((ecc) => {
          console.log(ecc)
        })
    }

    return {
      verify,
      success,
      // 验证码
      loginV,
      loginRef,
      login,
      useMessage,
      Retrieve,
      rules: {
        user: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入用户名')
            }
            if (value.search(/^[a-zA-Z0-9_]{3,16}$/) < 0) {
              return new Error('请输入正确用户名！')
            }
          },
        },
        passworld: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入密码')
            }
          },
        },
      },
    }
  },
}
</script>

<style>
/* #login {
  max-width: 500px;
} */
</style>