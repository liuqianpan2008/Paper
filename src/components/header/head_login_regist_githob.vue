<template>
  <div style="padding-right:30px ;">
    <n-space justify="end">
      <n-button @click="logo">
        <template #icon>
          <n-icon>
            <LogIn />
          </n-icon>
        </template>
        登录
      </n-button>
      <n-button @click="Register">
        <template #icon>
          <n-icon>
            <CafeOutline />
          </n-icon>
        </template>
        注册
      </n-button>
    </n-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LogIn, CafeOutline } from '@vicons/ionicons5'

export default defineComponent({
  components: { LogIn, CafeOutline },
  setup() {
    return {
      logo() {
        location.href = './#/login'
      },
      Register() {
        location.href = './#/register'
      },
    }
  },
})
</script>

<style>
</style>