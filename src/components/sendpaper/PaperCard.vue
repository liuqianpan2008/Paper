<template>
  <n-space justify="center">
    <n-gradient-text :size="24"
                     type="info"> 今天还能发{{sendInfo}}次 </n-gradient-text>
  </n-space>
  <n-card title="投纸">
    <n-form :show-require-mark="false"
            :model="paperCard"
            :rules="rules"
            ref="paperCardRef">
      <n-form-item label="纸片标题"
                   path="title">
        <n-input placeholder="输入纸片标题"
                 v-model:value="paperCard.title"
                 maxlength="50"
                 show-count />
      </n-form-item>

      <n-form-item label="纸片内容"
                   path="content">
        <n-input type="textarea"
                 placeholder="请输入卡片内容"
                 v-model:value="paperCard.content"
                 maxlength="50"
                 show-count />
      </n-form-item>
      <n-space justify="end">
        <n-button attr-type="button"
                  @click="send">发送卡片</n-button>
      </n-space>
    </n-form>
    <Verify @success="success"
            mode="pop"
            captchaType="clickWord"
            :imgSize="{width:'400px',height:'200px'}"
            ref="verify">
    </Verify>
  </n-card>
</template>



<script>
import { ref } from 'vue';
import axios from 'axios';
import { useMessage } from 'naive-ui';
import Verify from '../verifition/Verify.vue'
import config from "@/config/index"
const sendInfo = ref(0)
export default {
  sendInfo,
  components: { Verify },
  setup () {
    const success = (params) => {
      axios({
        url: config.baseURL + "/papers/seedpaper",
        method: "post",
        headers: {
          satoken: localStorage.getItem("Token"),
        },
        data: {
          title: paperCard.value.title,
          content: paperCard.value.content
        },
      }).then((response) => {
        const info = response.data
        if (!info.flag) {
          message.error(info.msg)
        } else {
          message.success(info.msg)
          sendInfo--;
        }
      })

    }
    const verify = ref()
    //验证码
    const paperCard = ref({
      title: "",
      content: "",
    })
    const paperCardRef = ref()
    const message = useMessage()
    const send = () => {
      paperCardRef.value.validate(async (errors) => {
        if (!errors) {
          verify.value.show();
        }
      })
    }


    return {
      paperCard, paperCardRef, send, sendInfo,
      success, verify,
      rules: {
        title: {
          required: true,
          trigger: ['input', 'blur'],
          message: '请输入卡片标题'
        },
        content: {
          required: true,
          trigger: ['input', 'blur'],
          message: '请输入卡片内容'
        }
      },
    }
  }
}
</script>

<style>
</style>