<template>
  <n-card title="注册">
    <n-form :show-require-mark="false"
            :model="registerV"
            :rules="rules"
            ref="registerRef">
      <n-form-item label="用户名"
                   path="user">
        <n-input placeholder="请输入"
                 v-model:value="registerV.user" />
      </n-form-item>

      <n-form-item label="密码"
                   path="passworld">
        <n-popover placement="bottom-end"
                   trigger="manual"
                   :show="showPopover">
          <template #trigger>
            <n-input type="password"
                     show-password-on="mousedown"
                     placeholder="请输入"
                     v-model:value="registerV.passworld"
                     :on-focus="Passworldfocus"
                     :on-blur="passwordblur" />
          </template>
          <span>{{pawssworldinfo.info}}</span><br>
          <span>{{pawssworldinfo.info1}}</span><br>
          <span>{{pawssworldinfo.info2}}</span><br>
        </n-popover>

      </n-form-item>
      <n-form-item label="确认密码"
                   path="passworld1">
        <n-input type="password"
                 show-password-on="mousedown"
                 placeholder="请输入"
                 v-model:value="registerV.passworld1" />
      </n-form-item>
      <n-form-item label="邮箱"
                   path="mail">
        <n-auto-complete v-model:value="registerV.mail"
                         placeholder="请输入邮箱" />
        <n-button attr-type="button"
                  @click="SeedmailCode"
                  :loading="loading"
                  :disabled="loading">发送验证码</n-button>
      </n-form-item>
      <n-form-item label="邮箱验证码"
                   path="mailCode">
        <n-input placeholder="请输入邮箱验证码"
                 v-model:value="registerV.mailCode" />
      </n-form-item>

      <n-space justify="end">
        <n-form-item>
          <n-button @click="registerBtn"
                    attr-type="button">注册</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>

  <Verify @success="success"
          mode="pop"
          captchaType="clickWord"
          :imgSize="{width:'400px',height:'200px'}"
          ref="verify">
  </Verify>
</template>

<script lang="ts">
import { FormItemRule } from 'naive-ui'
import { defineComponent, ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import Verify from '../verifition/Verify.vue'
import config from '@/config/index'
export default defineComponent({
  components: { Verify },
  setup() {
    const verify = ref()
    const success = (params) => {
      if (iscod.value) {
        loading.value = true
        axios
          .post(config.baseURL + '/mails/SeedCod', {
            mail: registerV.value.mail,
            cod: params,
          })
          .then((response) => {
            loading.value = false
            const info = response.data
            if (info.flag) {
              Mcod.value = info.date
              console.log(Mcod.value)
              location.href = './#/login'
              message.success(info.msg)
            } else {
              message.error(info.msg)
            }
          })
          .catch(() => {
            loading.value = false
          })
      } else {
        axios
          .post(config.baseURL + '/users/register', {
            user: registerV.value.user,
            password: registerV.value.passworld,
            mail: registerV.value.mail,
            cod: params,
          })
          .then((response) => {
            loading.value = false
            const info = response.data
            if (info.flag) {
              Mcod.value = info.date
              message.success(info.msg)
            } else {
              message.error(info.msg)
            }
          })
      }
    }
    const iscod = ref(true)
    //验证码
    const Mcod = ref('')
    const registerV = ref({
      user: '',
      passworld: '',
      passworld1: '',
      mail: '',
      mailCode: '',
    })
    const Code = ref(1)
    const registerRef = ref()
    const showPopover = ref()
    const mailCode = ref('hudoihfueafd')
    const pawssworldinfo = ref({
      info: '☹密码不含中文，且位数在3-16位',
      info1: '☹无小写或者大写字母',
      info2: '☹不含有数字',
    })

    const message = useMessage()
    const Passworldfocus = () => {
      showPopover.value = true
    }
    const passwordblur = () => {
      showPopover.value = false
    }

    const loading = ref(false)

    const registerBtn = () => {
      registerRef.value.validate(async (errors: any) => {
        if (!errors) {
          iscod.value = false
          verify.value.show()
        }
      })
    }
    const SeedmailCode = () => {
      iscod.value = true
      verify.value.show()
    }
    return {
      verify,
      success,
      registerV,
      registerBtn,
      SeedmailCode,
      registerRef,
      Code,
      showPopover,
      Passworldfocus,
      passwordblur,
      pawssworldinfo,
      loading,
      rules: {
        user: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入用户名')
            }
            if (value.search(/^[a-zA-Z0-9_]{3,16}$/) < 0) {
              return new Error('请保持用户名不含中文，且位数在3-16位')
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
            if (value.search(/^[a-zA-Z0-9_]{3,16}$/) < 0) {
              pawssworldinfo.value.info = '☹密码不含中文，且位数在3-16位'
              return new Error('密码不含中文，且位数在3-16位')
            } else {
              pawssworldinfo.value.info = '☺密码不含中文，且位数在3-16位'
            }
            if (value.search(/[A-Za-z]+/) < 0) {
              pawssworldinfo.value.info1 = '☹无小写或者大写字母'
            } else {
              pawssworldinfo.value.info1 = '☺含有小写或者大写字母'
            }
            if (value.search(/[0-9]+/) < 0) {
              pawssworldinfo.value.info2 = '☹不含有数字'
            } else {
              pawssworldinfo.value.info2 = '☺含有数字'
            }
          },
        },
        passworld1: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请再次输入密码')
            }
            if (value === registerV.value.passworld) {
              return true
            } else {
              return new Error('两次密码不一致')
            }
          },
        },
        mail: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入邮箱')
            }
          },
        },
        mailCode: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入邮箱验证码')
            }
            if (Mcod.value != value) {
              return new Error('邮箱验证码不正确')
            }
          },
        },
      },
    }
  },
})
</script>
<style>
</style>