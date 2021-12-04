<template>
  <n-space vertical
           id='vertical'>
    <n-card :title="cards.title"
            v-for="(cards,i) in card"
            :key="i"
            closable
            @close="handleClose(cards.id,cards.recipient)">
      <template #header-extra>
        {{cards.time}}
      </template>
      {{cards.content}}
      <template #action> {{cards.recipient==0?"这张卡片还没被人看见":"这张卡片被"+cards.recipient+"看到了"}} </template>
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
    const handleClose = (cardid, recipient) => {
      // console.log(id);
      if (recipient == 0) {
        axios({
          url: config.baseURL + "/papers/deleteseedpaper",
          method: "post",
          headers: {
            satoken: localStorage.getItem("Token"),
          },
          data: {
            id: cardid
          },
        }).then((response) => {
          const info = response.data
          if (info.date) {
            message.success(info.msg)

          } else {
            message.error(info.msg)
          }
        })
      } else {
        message.error("这张纸片已经被看到了，不能删除");
      }

    }
    watch(() => GlobalVue.card.value, (n, o) => {
      card.value = n;
    })
    watch(() => GlobalVue.Pagenumber.value, (n, o) => {
      pagenumber.value = n;
    })
    return {
      card, pagenumber, handleClose,
      page: (page) => {
        axios({
          url: config.baseURL + "/papers/seedlistpaper",
          method: "post",
          headers: {
            satoken: localStorage.getItem("Token"),
          },
          data: {
            current: page,
            Size: 4,
            seed: "0"
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