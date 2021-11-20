<template>
    <n-layout has-sider >

        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :native-scrollbar="false"
        >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuseed"
        />
      </n-layout-sider>
        <n-layout  :native-scrollbar="false" id="you">
          <router-view></router-view>
          <!-- <PaperCard /> -->
      </n-layout>
    </n-layout>
</template>

<script>
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
// import PaperCard from './PaperCard.vue'
import {
  BookOutline as BookIcon,
} from '@vicons/ionicons5'
function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuseed = [
  {
    label: ()=>h("a",{
      href: '#/PaperCut/CollectCards',
      target: '_Self',
      rel: 'noopenner noreferrer'
    },
      '捡起的卡片'),
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },{
    label:()=>h("a",{
      href: '#/PaperCut/MyseeCard',
      target: '_Self',
      rel: 'noopenner noreferrer'
    },
    '我捡起的纸片'),
    key: 'a-wild-sheep-chase',
    icon: renderIcon(BookIcon)
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
.n-card {
  min-width: 500px;
}
#you{
  min-width: 500px;
}
</style>