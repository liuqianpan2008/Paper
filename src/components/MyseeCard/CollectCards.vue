<template>
  <n-space vertical
           id='vertical'>
    <n-space justify="center">
      <n-gradient-text :size="24"
                       type="info"> 今天还能看{{AcceptCard}}次 </n-gradient-text>
    </n-space>
    <n-card>
      <template #header>
        <n-skeleton text
                    v-if="Scard.title==''"
                    width="60%" />
        <template v-else>{{Scard.title}}</template>
      </template>
      <n-skeleton text
                  v-if="Scard.title==''"
                  :repeat="6" />
      <template #header-extra> {{Scard.time}} </template>
      {{Scard.content}}
      <n-skeleton text
                  v-if="Scard.title==''"
                  width="60%" />
      <template #action>{{Scard.seeduser}} </template>
    </n-card>
    <n-space justify="center">
      <n-button type="info"
                @click="SeeCard">查看卡片</n-button>
    </n-space>
  </n-space>
</template>

<script>
import { ref, watch } from 'vue';
import axios from 'axios';
import { useMessage } from 'naive-ui';
const AcceptCard = ref(0)
export default {
  AcceptCard,
  setup () {
    const Scard = ref({ title: "" })
    const message = useMessage()
    return {
      Scard, AcceptCard,
      SeeCard: () => {
        if (AcceptCard.value != 0) {
          axios({
            url: "http://127.0.0.1:8888/papers/seepaper",
            method: "post",
            headers: {
              satoken: localStorage.getItem("Token"),
            }
          }).then((response) => {
            const info = response.data
            if (info.flag) {
              Scard.value = info.date;
              AcceptCard.value--
            } else {
              message.error(info.msg)
            }
          })

        }

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