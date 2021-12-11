<template>
  <n-layout :native-scrollbar="false">
    <n-layout-header>
      <n-card title="公告">
        <template #header-extra> 当前在线人数:{{Onlike.date}} </template>
        <template #footer> 纯在线聊天室不支持保存聊天数据，禁止色情暴力内容,QQ群和聊天室成功互联</template>
      </n-card>
    </n-layout-header>

    <n-layout-content content-style="min-height: 725px;;max-height: 725px;"
                      :native-scrollbar="false">
      <n-layout has-sider>
        <n-layout-sider :native-scrollbar="false"
                        collapse-mode="transform"
                        show-trigger="arrow-circle">
          <n-list bordered>
            <template #header> 在线用户列表 </template>
            <n-list-item v-for="(users,i) in Onlike.user"
                         :key="i">
              {{users}}
            </n-list-item>
          </n-list>

        </n-layout-sider>
        <n-layout-content>
          <n-card v-for="(cards,i) in chat"
                  :key="i"
                  :title="cards.user">
            <template #header-extra> {{cards.time}}
              <n-button text
                        style="font-size: 24px;"
                        type="warning"
                        @click="report(cards)">
                <n-icon>
                  <ReportGmailerrorredOutlined />
                </n-icon>
              </n-button>
            </template>
            <span v-html="cards.msg"></span>
          </n-card>
        </n-layout-content>
      </n-layout>

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
//ReportGmailerrorredOutlined
import { ReportGmailerrorredOutlined } from "@vicons/material"
import { ref, watch } from 'vue'
import axios from 'axios';
import { useMessage, useDialog } from 'naive-ui';
import GlobalVue from '@/Global.vue';
import config from '@/config/index'

export default {
  components: { Bullhorn, ReportGmailerrorredOutlined },
  setup () {
    const seedvalue = ref("");
    const dialog = useDialog()
    const message = useMessage()
    const SeedChat = () => {
      GlobalVue.Ws.value.getWs().send(JSON.stringify({
        "name": localStorage.getItem('user'),
        "type": "PublicCard",
        "date": "",
        "msg": seedvalue.value,
      }))
      seedvalue.value = ""
    }
    const report = (cards) => {
      dialog.warning({
        title: '举报',
        content: '你确定举报这条信息吗？',
        positiveText: '举报',
        negativeText: '不举报了',
        onPositiveClick: () => {

          axios({
            url: config.baseURL + "/mails/seedAdminMail",
            method: "post",
            data: {
              title: "聊天信息举报",
              content: cards.user + "说：" + cards.msg
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
    return {
      seedvalue, chat: GlobalVue.chat.value, SeedChat,
      Onlike: GlobalVue.Online, report
    }
  }
}
</script>

<style>
</style>