<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>
<script lang="ts">
import { defineComponent,h,ref } from 'vue'
// import {
//   BookOutline as BookIcon,
//   PersonOutline as PersonIcon,
//   WineOutline as WineIcon,
//   HomeOutline as HomeIcon
// } from '@vicons/ionicons5'
import{ HomeOutline as HomeIcon,PaperPlane as Paperlcon }from'@vicons/ionicons5'
import{ Blog as BlogIcon }from'@vicons/carbon'
import { NIcon } from 'naive-ui'

export default defineComponent({
   
    setup() {
        function renderIcon (icon:any) {
                return () => h(NIcon, null, { default: () => h(icon) })
        }
        ///
        const menuOptions = [
            {
                label:()=>h("a",{
                    href: '#/',
                    target: '_Self',
                    rel: 'noopenner noreferrer'
                },'首页'),
                key: 'go-back-home',
                icon: renderIcon(HomeIcon)
            },{
                label:()=>h("a",{
                    href: 'https://www.fengyeqiulin.cn',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },'博客'),
                key: 'go-Blog',
                icon: renderIcon(BlogIcon)
            },{
                label: '纸',
                 children: [{
                         type: 'group',
                         label: '纸飞机',
                         key: 'Paper-feeding',
                         children: [{
                            label: ()=>h("a",{
                            href: '#/sendpaper/PaperCard',
                            target: '_Self',
                            rel: 'noopenner noreferrer'
                            },'扔纸'),
                            key: 'narrator',
                            // icon: renderIcon(PersonIcon)
                        },{
                            ///PaperCut
                           label: ()=>h("a",{
                            href: '#/PaperCut/CollectCards',
                            target: '_Self',
                            rel: 'noopenner noreferrer'
                            },'捡纸'),
                            key: 'Pick-up-paper',
                        }],
                     }],
                key: 'Paper',
                icon: renderIcon(Paperlcon)
            }
        ]
     return {
      activeKey: ref(null),menuOptions
     }
    },
})
</script>
