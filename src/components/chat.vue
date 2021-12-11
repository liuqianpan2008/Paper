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
        纯在线聊天室不支持保存聊天数据，禁止色情暴力内容
      </n-alert>
    </n-layout-header>
    <n-layout-content content-style="min-height: 770px;;max-height: 770px;"
                      :native-scrollbar="false">
      <n-space vertical>

        <n-card v-for="(cards,i) in chat"
                :key="i"
                :title="cards.user">
          <template #header-extra> {{cards.time}} </template>
          {{cards.msg}}
        </n-card>

      </n-space>
    </n-layout-content>
    <n-layout-footer>
      <n-space vertical>
        <n-input v-model:value="seedvalue"
                 type="textarea"
                 placeholder="请输入" />
        <n-space justify="end">
          <n-button type="success"
                    @click="SeedChat">发送</n-button>
        </n-space>
      </n-space>
    </n-layout-footer>
  </n-layout>

</template>

<script>
import { Bullhorn } from '@vicons/carbon'
import { ref, watch } from 'vue'
import GlobalVue from '@/Global.vue';
export default {
  components: { Bullhorn },
  setup () {
    const seedvalue = ref("");
    // const chat = ref([]);
    const SeedChat = () => {
      GlobalVue.Ws.value.getWs().send(JSON.stringify({
        "name": localStorage.getItem('user'),
        "type": "PublicCard",
        "date": "",
        "msg": seedvalue.value,
      }))
      seedvalue.value = ""
    }
    return { seedvalue, chat: GlobalVue.chat.value, SeedChat }
  }
}
</script>

<style>
</style>