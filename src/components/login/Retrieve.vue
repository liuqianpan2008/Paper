<template>
  <n-card title="找回">
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
      <n-form-item label="邮箱验证码"
                   path="mailCode">
        <n-input placeholder="请输入邮箱验证码"
                 v-model:value="registerV.mailCode" />
        <n-button attr-type="button"
                  @click="SeedmailCode"
                  :loading="loading"
                  :disabled="loading">接受验证码</n-button>
      </n-form-item>
      <n-form-item label="验证码"
                   path="Code">
        <n-input placeholder="输入验证码"
                 v-model:value="registerV.Code" />
      </n-form-item>
      <PicCode :width="200"
               :height="50"
               v-model:Code="Code" />
      <n-space justify="end">
        <n-form-item>
          <n-button @click="registerBtn"
                    attr-type="button">找回</n-button>
        </n-form-item>
      </n-space>
    </n-form>
  </n-card>

</template>

<script lang="ts">
import { FormItemRule } from 'naive-ui'
import { defineComponent, ref, computed } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios'
import PicCode from '@/components/PicCode/PicCode.vue'
export default defineComponent({
  components: { PicCode },
  setup() {
    const registerV = ref({
      user: '',
      passworld: '',
      passworld1: '',
      Code: '',
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
          axios
            .post('api/Retrieve.php', {
              user: registerV.value.user,
              passworld: registerV.value.passworld,
              mail: registerV.value.mail,
            })
            .then((response) => {
              const info = response.data.info
              console.log(response.data)

              if (response.data.cod == '102') {
                message.success(info)
                location.href = '#/login'
              } else {
                message.error(info)
              }
            })
            .catch(() => {
              message.error('访问API服务器失败')
            })
        }
      })
    }
    const SeedmailCode = () => {
      loading.value = true
      axios
        .post('api/RetrieveMail.php', {
          user: registerV.value.user,
        })
        .then((response) => {
          const info = response.data.info
          if (response.data.cod == '103') {
            message.success(info)
            mailCode.value = response.data.mailCode
          } else {
            message.error(info)
          }
          loading.value = false
        })
        .catch(() => {
          message.error('访问API服务器失败')
          loading.value = false
        })
    }
    return {
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
        Code: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule: FormItemRule, value: any) => {
            if (value == '') {
              return new Error('请输入验证码')
            }
            if (value != Code.value) {
              return new Error('验证码不正确')
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
            if (mailCode.value != value) {
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