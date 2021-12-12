<template>
  <n-space vertical>
    <n-card title="用户名">
      <template #header-extra>
        <n-tag type="success"> 在线 </n-tag>
      </template>
      个签
      <template #footer>
        <n-space justify="end">
          <n-button type="success"
                    size="tiny"
                    @click="add(id)">添加ta为好友</n-button>
        </n-space>
      </template>
    </n-card>
  </n-space>
</template>

<script>
import axios from 'axios'
import config from "@/config/index";
import { useMessage } from 'naive-ui'
export default {
  setup () {
    const message = useMessage()
    const add = (id) => {
      axios({
        url: config.baseURL + "/users/Sign",
        method: "post",
        headers: {
          satoken: localStorage.getItem("Token"),
        },
      }).then((e) => {
        const info = e.data;
        if (info.date) {

          message.success(info.msg)
        } else {
          message.error(info.msg)
        }

      })

    }
    return { add }
  }
}
</script>

<style>
</style>