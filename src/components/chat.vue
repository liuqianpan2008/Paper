<template>
  <n-layout :native-scrollbar="false">
    <n-layout-header>
      <n-alert title="公告"
               type="default">
        <template #icon>
          <n-icon>
            <Bullhorn />
          </n-icon>
        </template>
        禁止色情暴力内容
      </n-alert>
    </n-layout-header>
    <n-layout-content content-style="min-height: 770px;;max-height: 770px;"
                      :native-scrollbar="false">
      <n-space vertical>

        <n-card title="用户名">
          <template #header-extra> 时间 </template>
          聊天内容
        </n-card>

      </n-space>
    </n-layout-content>
    <n-layout-footer>
      <n-space vertical>
        <n-input v-model:value="seedvalue"
                 type="textarea"
                 placeholder="请输入" />
        <n-space justify="end">
          <n-button type="success">发送</n-button>
        </n-space>
      </n-space>
    </n-layout-footer>
  </n-layout>

</template>

<script>
import { Bullhorn } from '@vicons/carbon'
import { ref } from 'vue'
export default {
  components: { Bullhorn },
  setup () {
    const seedvalue = ref("");
    const chats = ref("");
    return { seedvalue, chats }
  }
}
</script>

<style>
</style>