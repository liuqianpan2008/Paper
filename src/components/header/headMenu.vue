<template>
  <n-menu v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions" />
</template>
<script lang="ts">
import { h, ref } from 'vue'
import { useNotification } from 'naive-ui'
import Globat from '@/Global.vue'
import WS from '@/WS'
import {
  HomeOutline as HomeIcon,
  PaperPlane as Paperlcon,
} from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'

export default {
  setup() {
    function renderIcon(icon: any) {
      return () => h(NIcon, null, { default: () => h(icon) })
    }
    const notification = useNotification()
    if (localStorage.getItem('user') != null) {
      Globat.Ws.value = new WS.ws(localStorage.getItem('user'))
      Globat.Ws.value.ws_connect((e: any) => {
        const info = e.data
        console.log(info)
        notification.info({
          content: '卡片被看了',
          meta: info,
        })
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
