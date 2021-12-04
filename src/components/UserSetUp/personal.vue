<template>
  <n-card title="个人信息">
    <!-- 用户名:{{userlist.user}}<br>
    邮箱：{{userlist.mail}}<br>
    剩余发送卡片次数：{{userlist.seed}}<br>
    剩余查看卡片次数：{{userlist.accept}} -->
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
          <div>次数会在每天四重置</div>
        </n-popover>
      </n-form-item>
    </n-form>
  </n-card>
</template>

<script>


import Global from "@/Global.vue";
import { ref, watch } from 'vue';
import { HelpCircleOutline } from '@vicons/ionicons5'

export default {
  components: {
    HelpCircleOutline
  },
  setup () {
    const userlist = ref({
      user: "",
      seed: "",
      accept: ""
    })
    watch(() => Global.User.value, (n, o) => {
      userlist.value = n
      // console.log(userlist.value.user);
    })
    const loginRef = ref()
    return {
      userlist, loginRef,
      jz: true
    }
  }
}
</script>

<style>
</style>