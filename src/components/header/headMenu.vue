<template>
  <n-menu v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions" />
</template>
<script lang="ts">
import { h, ref } from 'vue'
import { useNotification, useMessage, NButton, NAvatar } from 'naive-ui'
import Globat from '@/Global.vue'
import WS from '@/WS'
import {
  HomeOutline as HomeIcon,
  PaperPlane as Paperlcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import axios from 'axios'
import config from '@/config/index'
import chat from '@/components/chat.vue'

export default {
  setup() {
    const message = useMessage()
    function renderIcon(icon: any) {
      return () => h(NIcon, null, { default: () => h(icon) })
    }
    const notification = useNotification()
    //在线获取收纸片消息
    if (localStorage.getItem('user') != null) {
      Globat.Ws.value = new WS.ws(localStorage.getItem('user'))
      Globat.Ws.value.ws_connect((e: any) => {
        const info = JSON.parse(e.data)
        console.log(info)
        if (info.type == 'SeeYourCard') {
          notification.info({
            content: '卡片被看了',
            meta: info.msg,
          })
        }
        if (info.type == 'AddFriend') {
          const n = notification.info({
            content: '好友添加请求',
            meta: info.msg + '(关闭表示拒绝)',
            action: () =>
              h(
                NButton,
                {
                  text: true,
                  type: 'primary',
                  onClick: () => {
                    n.destroy()
                    axios({
                      url: config.baseURL + '/users/AddFriend',
                      method: 'post',
                      headers: {
                        satoken: localStorage.getItem('Token'),
                      },
                      data: {
                        id: info.date,
                      },
                    })
                      .then((response) => {
                        const info = response.data
                        if (info.date) {
                          message.warning('加好友成功')
                        } else {
                          message.error(info.msg)
                        }
                      })
                      .catch((response) => {
                        message.error('API获取失败')
                      })
                  },
                },
                {
                  default: () => '同意',
                }
              ),
            onClose: () => {
              message.warning('已拒绝请求')
            },
          })
        }
        //接受聊天室信息
        if (info.type == 'PublicCard') {
          Globat.chat.value.push(info)
        }
        //接受聊天室在线人数
        if (info.type == 'Online') {
          Globat.Online.value = info
        }
      })
    }
    //离线获取收纸片消息
    if (localStorage.getItem('user') != null) {
      axios({
        url: config.baseURL + '/users/Getmessage',
        method: 'post',
        headers: {
          satoken: localStorage.getItem('Token'),
        },
      }).then((response) => {
        const info = response.data.date

        if (info != null) {
          console.log('离线接受的卡片', info)
          if (info.type == 'SeeYourCard') {
            info.forEach(function (item: { name: string; msg: string }) {
              notification.info({
                content: '卡片被看了',
                meta: item.name + '看了你的《' + item.msg + '》卡片',
              })
            })
          } else if (info.type == 'AddFriend') {
            const n = notification.info({
              content: '好友添加请求',
              meta: info.msg + '(关闭表示拒绝)',
              action: () =>
                h(
                  NButton,
                  {
                    text: true,
                    type: 'primary',
                    onClick: () => {
                      n.destroy()
                      axios({
                        url: config.baseURL + '/users/AddFriend',
                        method: 'post',
                        headers: {
                          satoken: localStorage.getItem('Token'),
                        },
                        data: {
                          id: info.date,
                        },
                      })
                        .then((response) => {
                          const info = response.data
                          if (info.date) {
                            message.warning('加好友成功')
                          } else {
                            message.error(info.msg)
                          }
                        })
                        .catch((response) => {
                          message.error('API获取失败')
                        })
                    },
                  },
                  {
                    default: () => '同意',
                  }
                ),
              onClose: () => {
                axios({
                  url: config.baseURL + '/users/DelFriend',
                  method: 'post',
                  headers: {
                    satoken: localStorage.getItem('Token'),
                  },
                  data: {
                    id: info.date,
                  },
                })
                  .then((response) => {
                    const info = response.data
                    if (info.date) {
                      message.warning('加好友成功')
                    } else {
                      message.error(info.msg)
                    }
                  })
                  .catch((response) => {
                    message.error('API获取失败')
                  })
                message.warning('已拒绝请求')
              },
            })
          }
        }
      })
    }

    const menuOptions = [
      {
        label: () =>
          h(
            'a',
            {
              href: '#/',
              target: '_Self',
              rel: 'noopenner noreferrer',
            },
            '首页'
          ),
        key: 'go-back-home',
        icon: renderIcon(HomeIcon),
      },
      {
        label: '纸',
        children: [
          {
            type: 'group',
            label: '纸飞机',
            key: 'Paper-feeding',
            children: [
              {
                label: () =>
                  h(
                    'a',
                    {
                      href: './#/sendpaper/PaperCard',
                      target: '_Self',
                      rel: 'noopenner noreferrer',
                    },
                    '扔纸'
                  ),
                key: 'narrator',
              },
              {
                label: () =>
                  h(
                    'a',
                    {
                      href: './#/PaperCut/CollectCards',
                      target: '_Self',
                      rel: 'noopenner noreferrer',
                    },
                    '捡纸'
                  ),
                key: 'Pick-up-paper',
              },
              {
                label: () =>
                  h(
                    'a',
                    {
                      href: './#/PublicPaper',
                      target: '_Self',
                      rel: 'noopenner noreferrer',
                    },
                    '公开纸片'
                  ),
                key: 'Pick-Public-Paper',
              },
            ],
            //PublicPaper
          },
          {
            type: 'group',
            label: '实验室',
            key: 'Paper-feeding',
            children: [
              {
                label: () =>
                  h(
                    'a',
                    {
                      href: './#/chat',
                      target: '_Self',
                      rel: 'noopenner noreferrer',
                    },
                    '聊天室'
                  ),
                key: 'Pick-char',
              },
            ],
          },
        ],
        key: 'Paper',
        icon: renderIcon(Paperlcon),
      },
    ]

    return {
      activeKey: ref(null),
      menuOptions,
    }
  },
}
</script>
