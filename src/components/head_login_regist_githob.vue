<template>
      <div style="padding-right:30px ;">
            <n-space justify="end">
                <n-button @click="logo">登录</n-button>
                <n-button  @click="Register">注册</n-button>
                <n-button @click="GitHob">GItHob!</n-button>
            </n-space>
      </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
      setup() {
            return{
                  logo () {
                        location.href="./#/login"
                  },
                  Register(){
                        location.href="./#/register"
                  },
                  GitHob(){
                        location.href="https://github.com/liuqianpan2008/Paper"
                  }
            }
      },
})
</script>

<style>

</style>