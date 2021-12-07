<template>
  <n-alert title="谨慎"
           type="warning">
    请发送健康向上内容，否则会违规扣除次数且不会发送纸片
  </n-alert>
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
      <n-form-item label="是否公开">
        <n-switch checked-value="1"
                  unchecked-value="0"
                  @update:value="handleUpdateValue">
          <template #checked>公开</template>
          <template #unchecked>不公开</template>
        </n-switch>
        <n-popover :overlap="overlap"
                   placement="right-start"
                   trigger="hover">
          <template #trigger>
            <n-icon size="20"
                    color="#0e7a0d">
              <HelpCircleOutline />
            </n-icon>
          </template>
          <div>实验性功能：公开的纸片会在纸片墙上显示,并且不会在捡纸片捡到</div>
        </n-popover>
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
import { HelpCircleOutline } from '@vicons/ionicons5'
import Verify from '../verifition/Verify.vue'
import config from "@/config/index"
const sendInfo = ref(0)
export default {
  sendInfo,
  components: { Verify, HelpCircleOutline },
  setup () {
    const handleUpdateValue = (value) => {
      public_p.value = value

      if (value == "1") {
        message.warning("这张纸条将公开，你知道这样做意味着什么")
      }

    }
    const public_p = ref()
    const success = (params) => {
      console.log(public_p.value);
      axios({
        url: config.baseURL + "/papers/seedpaper",
        method: "post",
        headers: {
          satoken: localStorage.getItem("Token"),
        },
        data: {
          title: paperCard.value.title,
          content: paperCard.value.content,
          cod: params,
          publicP: public_p.value
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
      success, verify, handleUpdateValue,
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
        },

      },
    }
  }
}
</script>

<style>
</style>