<template>
  <n-space vertical
           id='vertical'>
    <n-card :title="cards.title"
            v-for="(cards,i) in card"
            :key="i">
      <template #header-extra> {{cards.time}}</template>
      {{cards.content}}
      <template #action>这张卡片是由 {{cards.seeduser}} 发送的 </template>
    </n-card>
  </n-space>
  <n-layout-footer>
    <n-space justify="center">
      <n-pagination :page-count="pagenumber"
                    :on-update:page="page" />
    </n-space>
  </n-layout-footer>
</template>

<script>
import { watch, ref } from 'vue';
import GlobalVue from '@/Global.vue';
import axios from 'axios';
import { useMessage } from 'naive-ui';
import config from "@/config/index"
export default {
  setup () {
    const message = useMessage()
    const card = ref()
    const pagenumber = ref(1)
    watch(() => GlobalVue.card.value, (n, o) => {
      card.value = n;
    })
    watch(() => GlobalVue.Pagenumber.value, (n, o) => {
      pagenumber.value = n;
    })
    return {
      card, pagenumber,
      page: (page) => {
        axios({
          url: config.baseURL+"/papers/seedlistpaper",
          method: "post",
          headers: {
            satoken: localStorage.getItem("Token"),
          },
          data: {
            current: page,
            Size: 4,
            seed: "1"
          },
        }).then((response) => {
          const info = response.data
          card.value = info.date.records
        })
      }
    }
  }
}

</script>

<style>
#vertical {
  min-height: 800px;
}
</style>