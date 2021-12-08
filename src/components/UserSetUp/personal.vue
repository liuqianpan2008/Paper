<template>
  <n-card title="个人信息">
    <n-form :show-require-mark="false"
            :model="userlist"
            ref="loginRef">
      <n-form-item label="用户名"
                   path="user">
        <n-input v-model:value="userlist.user"
                 :disabled="jz" />
      </n-form-item>
      <n-form-item label="邮箱"
                   path="user">
        <n-input v-model:value="userlist.mail"
                 :disabled="jz" />
      </n-form-item>
    </n-form>

  </n-card>
  <n-card title="捡纸次数">
    <n-form :show-require-mark="false"
            :model="userlist"
            ref="loginRef"
            inline>
      <n-form-item label="剩余发送卡片次数："
                   path="user">
        <n-input v-model:value="userlist.seed"
                 :disabled="jz" />
      </n-form-item>
      <n-form-item label="剩余查看卡片次数："
                   path="user">
        <n-input v-model:value="userlist.accept"
                 :disabled="jz" />
        <n-popover :overlap="overlap"
                   placement="right-start"
                   trigger="hover">
          <template #trigger>
            <n-icon size="20"
                    color="#0e7a0d">
              <HelpCircleOutline />
            </n-icon>
          </template>
          <div>次数只能在签到获取</div>
        </n-popover>
        <n-button type="success"
                  @click="Sign"
                  :disabled="SignRef">签到</n-button>
      </n-form-item>

    </n-form>
  </n-card>
</template>

<script>


import Global from "@/Global.vue";
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue';
import { HelpCircleOutline } from '@vicons/ionicons5'
import axios from 'axios';
import config from "@/config/index";
const SignRef = ref();
export default {
  SignRef,
  components: {
    HelpCircleOutline
  },
  setup () {
    const userlist = ref({
      user: "",
      seed: "",
      accept: ""
    })
    const message = useMessage()
    watch(() => Global.User.value, (n, o) => {
      userlist.value = n
      // console.log(userlist.value.user);
    })
    const Sign = () => {

      axios({
        url: config.baseURL + "/users/Sign",
        method: "post",
        headers: {
          satoken: localStorage.getItem("Token"),
        },
      }).then((e) => {
        const info = e.data;
        if (info.flag) {
          message.success(info.msg)
          SignRef.value = true;
          userlist.value.accept += info.date[0]
          userlist.value.seed += info.date[1]
        } else {
          message.error(info.msg)
        }

      });

    }
    const loginRef = ref()
    return {
      userlist, loginRef,
      jz: true,
      Sign,
      SignRef
    }
  }
}
</script>

<style>
</style>