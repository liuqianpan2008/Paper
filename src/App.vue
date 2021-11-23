<template>
<n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN">
  <n-message-provider>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header embedded> <Navigation /> </n-layout-header>
      <n-layout-content class="main" >
          <router-view></router-view>
      </n-layout-content>
      
        <n-layout-footer embedded>
          <n-tooltip trigger="hover">
          <template #trigger>
          <p style="text-align: center;">Paper0.0.1 · Made by 枫叶秋林</p>
          </template>
            催更？不可能！
          </n-tooltip>

        </n-layout-footer>
    </n-layout>
  </n-space>
  </n-message-provider>
</n-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from "./components/header.vue"
import Globat from './Global.vue';
export default defineComponent({
  name: 'App',
  components:{Navigation},
    setup() {
      if (localStorage.getItem("user")!=null) {
        Globat.User.value=localStorage.getItem("user")
        console.log(Globat.sex.value);
      }
      
      if (localStorage.getItem('sex')!=null) {
        Globat.sex.value=localStorage.getItem('sex')
        console.log(Globat.sex.value);
      }

     if (localStorage.getItem('loged')=="false") {
      Globat.loged.value=false;
     }
      return {}
    }
  })
</script>

<style>

.main{
  background-image: linear-gradient(to right bottom, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
  padding: 10px;
  height: 1000px;
}
</style>
