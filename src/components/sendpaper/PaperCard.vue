<template>
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
      <n-form-item label="验证码"
                   path="Code">
        <n-input placeholder="输入验证码"
                 v-model:value="paperCard.Code" />
      </n-form-item>
      <PicCode :width="200"
               :height="50"
               v-model:Code="Code" />
      <n-space justify="end">
        <n-button attr-type="button"
                  @click="send">发送卡片</n-button>
      </n-space>
    </n-form>

  </n-card>
</template>



<script>
import { ref } from 'vue';
import axios from 'axios';
import { useMessage } from 'naive-ui';
import PicCode from "@/components/PicCode/PicCode.vue";
export default {
  components: { PicCode },
  setup () {
    const paperCard = ref({
      title: "",
      content: "",
      Code: ""
    })
    const Code = ref(1);
    const paperCardRef = ref()
    const message = useMessage()
    const send = () => {
      paperCardRef.value.validate(async (errors) => {
        if (!errors) {
          axios.post(("api/SendPaperCard.php"), {
            user: localStorage.getItem("user"),
            title: paperCard.value.title,
            content: paperCard.value.content,
            kay: localStorage.getItem("kay")
          }).then((response) => {
            const info = response.data.info;
            console.log(response.data);
            if (response.data.cod == "102") {
              message.success(info);
              location.href = './#/sendpaper/MyPaperCard';
            } else {
              message.error(info);
            }
          }).catch(() => {
            message.error("访问API服务器失败");
          });
        }
      })
    }
    return {
      paperCard, paperCardRef, send, Code,
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
        Code: {
          required: true,
          trigger: ['input', 'blur'],
          validator: (rule, value) => {
            console.log(Code.value);
            if (value == "") {
              return new Error('请输入验证码')
            }
            if (value != Code.value) {
              return new Error('验证码不正确')
            }
          }
        }
      },
    }
  }
}
</script>

<style>
</style>