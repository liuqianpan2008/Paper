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
                    @click="add('admin')">添加ta为好友</n-button>
        </n-space>
      </template>
    </n-card>
  </n-space>
</template>

<script>
import axios from 'axios'
import config from "@/config/index";
import { useMessage } from 'naive-ui'
import Global from "@/Global.vue";
export default {
  setup () {
    const message = useMessage()
    const add = (id) => {
      axios({
        url: config.baseURL + "/users/AddFriend",
        method: "post",
        headers: {
          satoken: localStorage.getItem("Token"),
        },
        data: {
          id: id
        },
      })
        .then((response) => {
          const info = response.data;
          if (info.date) {
            message.success("添加请求成功")
            Global.Ws.value.getWs().send(JSON.stringify({
              "name": localStorage.getItem('user'),
              "type": "AddFriend",
              "date": id,
              "msg": "",
            }))
          } else {
            message.error(info.msg)
          }
        })
        .catch((response) => {
          message.error("API获取失败");
        });


    }
    return { add }
  }
}
</script>

<style>
</style>