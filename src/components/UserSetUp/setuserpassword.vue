<template>
  <n-alert title="谨慎"
           type="warning">
    本页面涉及安全信息修改，谨慎操作
  </n-alert>
  <n-card title="安全修改">
    <n-form :show-require-mark="false"
            :model="SetupV"
            :rules="rules"
            ref="SetupRef">
      <n-form-item label="新密码"
                   path="passworld">
        <n-input type="password"
                 show-password-on="mousedown"
                 placeholder="请输入"
                 v-model:value="SetupV.passworld" />
      </n-form-item>
      <n-form-item label="确认新密码"
                   path="passworld1">
        <n-input type="password"
                 show-password-on="mousedown"
                 placeholder="请输入"
                 v-model:value="SetupV.passworld1" />
      </n-form-item>
      <n-form-item label="修改邮箱"
                   path="mail">
        <n-input show-password-on="mousedown"
                 placeholder="请输入"
                 v-model:value="SetupV.mail" />
      </n-form-item>
      <n-form-item label="验证码邮箱"
                   path="mailCode">
        <n-input show-password-on="mousedown"
                 placeholder="请输入"
                 v-model:value="SetupV.mailCode" />
        <n-button @click="mailyz"
                  attr-type="button"
                  :loading="loading"
                  :disabled="loading">接受验证码</n-button>
      </n-form-item>
      <n-space justify="end">
        <n-form-item>
          <n-button @click="setup"
                    attr-type="button">确认修改</n-button>
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

<script>

import { ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import Verify from '../verifition/Verify.vue'
import Global from "@/Global.vue";
import axios from 'axios';
import config from '@/config/index'
export default {
  components: { Verify },
  setup () {
    const Mcod = ref("")
    const message = useMessage()
    const SetupRef = ref()
    const verify = ref()
    const Issetup = ref(true);
    const loading = ref(false);
    const SetupV = ref({
      passworld: "",
      passworld1: "",
      mail: "",
      mailCode: ""
    })
    watch(() => Global.User.value, (n, o) => {
      SetupV.value.mail = n.mail
      console.log(n.mail);

    })
    const setup = () => {
      SetupRef.value.validate(async (errors) => {
        if (!errors) {
          verify.value.show()
          Issetup.value = true;
        }
      })

    }
    const mailyz = () => {
      verify.value.show()
      Issetup.value = false;
    }

    const success = (params) => {
      console.log(Issetup.value);
      if (Issetup.value) {
        axios({
          url: config.baseURL + "/users/SetupUser",
          method: "post",
          headers: {
            satoken: localStorage.getItem("Token"),
          },
          data: {
            password: SetupV.value.passworld,
            mail: SetupV.value.mail,
            cod: params
          }
        }).then((response) => {
          const info = response.data
          if (info.date) {
            axios({
              url: config.baseURL + '/users/logout',
              headers: {
                satoken: localStorage.getItem('Token'),
              },
            }).then((e) => {
              message.success(info.msg)
              localStorage.removeItem("Token")
              Global.IsLog.value = false;
              location.href = './#'
            })


          } else {
            message.error(info.msg)
          }
        })
      } else {
        if (SetupV.value.mail != "") {
          loading.value = true;
          axios
            .post(config.baseURL + '/mails/SeedCod', {
              mail: SetupV.value.mail,
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
        } else {
          message.error("请填写邮箱")
        }


      }

    }
    return {
      setup, success, SetupV, message, SetupRef, verify, mailyz, loading,
      rules: {
        passworld: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule, value) => {
            if (value == '') {
              return new Error('请输入密码')
            }
          },
        },
        passworld1: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule, value) => {
            if (value == '') {
              return new Error('请再次输入密码')
            }
            if (value === SetupV.value.passworld) {
              return true
            } else {
              return new Error('两次密码不一致')
            }
          },
        },
        mail: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule, value) => {
            if (value == '') {
              return new Error('请输入邮箱')
            }
          },
        },
        mailCode: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule, value) => {
            if (value == '') {
              return new Error('请输入验证码')
            } if (Mcod.value != value) {
              return new Error('验证码不正确')
            }
          },
        }

      }

    }
  }

}
</script>

<style>
</style>