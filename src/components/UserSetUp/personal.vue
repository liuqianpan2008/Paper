<template>
  <n-card title="个人信息">
    用户名:{{userlist.user}}<br>
    邮箱：{{userlist.mail}}<br>
    剩余发送卡片次数：{{userlist.seed}}<br>
    剩余查看卡片次数：{{userlist.accept}}<br>
  </n-card>
</template>

<script>


import axios from 'axios'
import Global from "@/Global.vue";
import { ref, watch } from 'vue';
export default {

  setup () {
    const userlist = ref({
      user: "",
      seed: "",
      accept: ""
    })
    watch(() => Global.User.value, (n, o) => {
      userlist.value = n
      console.log(userlist.value.user);
    })
    return { userlist }
  }
}
</script>

<style>
</style>