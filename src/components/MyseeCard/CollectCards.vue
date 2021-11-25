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
import GlobalVue from '@/Global.vue';
import axios from 'axios';
import { useMessage } from 'naive-ui';
export default {
  setup () {
    const Scard = ref({ title: "" })
    const AcceptCard = ref()
    const message = useMessage()
    watch(() => GlobalVue.AcceptCard.value, (n, o) => {
      AcceptCard.value = n;
    })
    return {
      Scard, AcceptCard,
      SeeCard: () => {
        axios.post("api/SeeCard.php", {
          user: localStorage.getItem("user"),
          kay: localStorage.getItem("kay")
        }).then(response => {
          const cod = response.data.cod;
          const info = response.data.info;
          if (cod == "103") {
            Scard.value = response.data.card;
          } else {
            message.error(info);
          }

        }).catch(e => {
          console.log(e);
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