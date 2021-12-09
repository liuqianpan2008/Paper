<template>
  <n-config-provider :theme="darkTheme"
                     :locale="zhCN"
                     :date-locale="dateZhCN">
    <n-message-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-space vertical
                   size="large">
            <n-layout>
              <n-layout-header embedded>
                <Navigation />
              </n-layout-header>
              <n-layout-content class="main">
                <router-view></router-view>
              </n-layout-content>

              <n-layout-footer embedded>
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <p style="text-align: center;">Paper0.1.1 · Made by <a href="https://github.com/liuqianpan2008">@枫叶秋林</a></p>
                  </template>
                  {{t}}
                </n-tooltip>

              </n-layout-footer>
            </n-layout>
          </n-space>
        </n-notification-provider>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import axios from 'axios'
import { useNotification } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import Navigation from './components/header/header.vue'
import Globat from './Global.vue'
import config from '@/config/index'
import WS from '@/WS'
export default defineComponent({
  name: 'App',
  components: { Navigation },

  setup() {
    const t = ref('')
    // const notification = useNotification()
    axios
      .get('https://v1.hitokoto.cn/')
      .then((e) => {
        t.value = e.data.hitokoto
      })
      .catch((e) => {
        t.value = e.data.hitokoto
      })

    axios({
      url: config.baseURL + '/users/isLogin',
      headers: {
        satoken: localStorage.getItem('Token'),
      },
    }).then((e) => {
      const info = e.data
      //IsLog
      Globat.IsLog.value = info.date
      console.log(Globat.IsLog.value)
    })
    if (localStorage.getItem('user') != null) {
      Globat.Ws.value = new WS.ws(localStorage.getItem('user'))
      Globat.Ws.value.ws_connect((e: any) => {
        const info = e.data
        console.log(info)
        // notification.info(info)
      })
    }
    return { t }
  },
})
</script>

<style>
.main {
  background-image: linear-gradient(
    to right bottom,
    #d16ba5,
    #c777b9,
    #ba83ca,
    #aa8fd8,
    #9a9ae1,
    #8aa7ec,
    #79b3f4,
    #69bff8,
    #52cffe,
    #41dfff,
    #46eefa,
    #5ffbf1
  );
  padding: 10px;
  height: 1000px;
}
</style>
