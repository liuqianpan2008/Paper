<template>
  <n-layout has-sider
            content-style="height: 980px;">

    <n-layout-sider collapse-mode="width"
                    :collapsed-width="64"
                    :width="168"
                    :native-scrollbar="true"
                    show-trigger="arrow-circle"
                    bordered>
      <n-menu :collapsed-width="64"
              :collapsed-icon-size="22"
              :options="menuseed" />
    </n-layout-sider>
    <n-layout :native-scrollbar="false">
      <router-view></router-view>
      <!-- <PaperCard /> -->
    </n-layout>
  </n-layout>
</template>

<script>
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
// import PaperCard from './PaperCard.vue'
import { BookOutline as BookIcon, } from '@vicons/ionicons5'
import { AccountCircleSharp } from '@vicons/material'
function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuseed = [
  {
    label: () => h("a", {
      href: './#/UserSetUp/personal',
      target: '_Self',
      rel: 'noopenner noreferrer'
    },
      '个人资料'),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  }, {
    label: () => h("a", {
      href: './#/UserSetUp/SetPassword',
      target: '_Self',
      rel: 'noopenner noreferrer'
    },
      '密码安全'),
    key: 'a-wild-sheep-chase',
    icon: renderIcon(AccountCircleSharp)
  }
]
export default defineComponent({
  // components:{PaperCard},
  setup () {
    return {
      menuseed
    }
  }
})
</script>

<style>
</style>