<template>
  <n-card title="个人信息">
    用户名:{{user}}<br>
    性别：{{axe}}<br>
  </n-card>
</template>

<script>
import Globat from '../../Global.vue'
export default {

  setup () {
    const user = Globat.User.value
    const axe = Globat.sex.value
    return { user, axe }
  }
}
</script>

<style>
</style>