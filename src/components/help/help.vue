<template>
  <n-layout has-sider
            content-style="height: 980px;">
    <n-layout-sider collapse-mode="width"
                    :collapsed-width="64"
                    :width="168"
                    :native-scrollbar="false"
                    show-trigger="arrow-circle"
                    bordered>
      <n-menu :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuseed" />
    </n-layout-sider>
    <n-layout :native-scrollbar="false"
              bordered>
      <router-view></router-view>
    </n-layout>
  </n-layout>
</template>
<script>
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
// import PaperCard from './PaperCard.vue'
import {
  PaperPlane as Paperlcon,
} from '@vicons/ionicons5'
import { AccountCircleSharp } from '@vicons/material'
function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuseed = [
  {
    label: '纸片功能',
    icon: renderIcon(Paperlcon),
    children: [
      {
        label: () => h("a", {
          href: './#/Help/HelpSeedPaper',
          target: '_Self',
          rel: 'noopenner noreferrer'
        },
          '投纸'),
      }, {
        //HelpSee
        label: () => h("a", {
          href: './#/Help/HelpSeePaper',
          target: '_Self',
          rel: 'noopenner'
        },
          '捡纸'),
        key: 'a-wild-sheep-chase1',
      }
    ]
  }, {
    label: () => h("a", {
      href: './#/Help/AboutUs',
      target: '_Self',
      rel: 'noopenner noreferrer'
    },
      '关于我们'),
    key: 'a-wild-sheep-chase',
    icon: renderIcon(AccountCircleSharp)
  }
]
export default defineComponent({
  setup () {
    return {
      menuseed
    }
  }


})
</script>

<style>
</style>