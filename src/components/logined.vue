<template>
  <n-space justify="end">
    <!-- <n-gradient-text type="info"> 欢迎{{user}}{{sex=="男"?"先生":"女生"}}登录！ </n-gradient-text> -->
    <n-button type="info"
              @click="UserSetUp">设置</n-button>
    <n-button @click="cancellation"
              type="error">注销</n-button>
  </n-space>
</template>

<script>

import axios from 'axios'
import { defineComponent, watch, ref } from 'vue'
import Globat from '../Global.vue'
import config from "@/config/index"
export default defineComponent({
  setup () {
    const cancellation = () => {
      console.log("注销按钮点击了");

      axios({
        url: config.baseURL + '/users/logout',
        headers: {
          satoken: localStorage.getItem('Token'),
        },
      }).then((e) => {
        localStorage.removeItem("Token")
        Globat.IsLog.value = false;
        location.href = './#'
      })

    }

    const UserSetUp = () => {
      location.href = "./#/UserSetUp/personal";
    }

    return {
      cancellation, UserSetUp
    }

  },
})
</script>

<style>
</style>