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

import { defineComponent, watch, ref } from 'vue'
import Globat from '../Global.vue'
export default defineComponent({
  setup () {
    const user = ref(Globat.User.value);
    const sex = ref(Globat.sex.value);
    watch(() => Globat.User.value, (nv, nsex) => {
      user.value = nv;
    })
    watch(() => Globat.sex.value, (nv, ov) => {
      sex.value = nv;
    })
    const cancellation = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('sex')
      localStorage.removeItem('loged')
      localStorage.removeItem('kay');
      Globat.loged.value = true;
      Globat.User.value = "";
      Globat.sex.value = "";
      location.href = "#/";
    }
    const UserSetUp = () => {
      location.href = "./#/UserSetUp/personal";
    }
    return {
      user, sex, cancellation, UserSetUp
    }
  },
})
</script>

<style>
</style>