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
      <template #header-extra> {{Scard.time}}
        <n-button text
                  style="font-size: 24px;"
                  type="warning"
                  @click="report(Scard)">
          <n-icon>
            <ReportGmailerrorredOutlined />
          </n-icon>
        </n-button>
      </template>

      <span v-html="Scard.content"></span>
      <n-skeleton text
                  v-if="Scard.title==''"
                  width="60%" />
      <template #action>
        {{Scard.seeduser}}
      </template>
    </n-card>
    <n-space justify="center">
      <n-button type="info"
                @click="SeeCard">查看卡片</n-button>
    </n-space>
  </n-space>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useMessage, useDialog } from 'naive-ui';
import config from "@/config/index"
import Globat from '@/Global.vue'
import { ReportGmailerrorredOutlined } from "@vicons/material"
const AcceptCard = ref(0)
export default {
  AcceptCard,
  components: { ReportGmailerrorredOutlined },
  setup () {
    const Scard = ref({ title: "" })
    const message = useMessage()
    const dialog = useDialog()
    const report = (cards) => {
      if (cards.seeduser == null) {
        message.error("你还没看卡片怎么举报")

      } else {
        dialog.warning({
          title: '举报',
          content: '你确定举报这条卡片吗？',
          positiveText: '举报',
          negativeText: '不举报了',
          onPositiveClick: () => {

            axios({
              url: config.baseURL + "/mails/seedAdminMail",
              method: "post",
              data: {
                title: "卡片信息举报",
                content: cards.seeduser + "说：" + cards.content
              },
            }).then((response) => {
              const info = response.data
              if (info.flag) {
                message.success(info.msg)

              } else {
                message.error(info.msg)
              }
            })
          },
          onNegativeClick: () => {

          }
        })
      }



    }
    return {
      Scard, AcceptCard, report,
      SeeCard: () => {
        if (AcceptCard.value != 0) {
          axios({
            url: config.baseURL + "/papers/seepaper",
            method: "post",
            headers: {
              satoken: localStorage.getItem("Token"),
            }
          }).then((response) => {
            const info = response.data
            if (info.flag) {
              Scard.value = info.date;
              AcceptCard.value--
              Globat.Ws.value.getWs().send(JSON.stringify({
                "name": localStorage.getItem('user'),
                "type": "SeeYourCard",
                "date": Scard.value.seeduser,
                "msg": Scard.value.title,
              }))

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