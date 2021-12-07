<template>
  <n-grid :cols="12"
          item-responsive
          responsive="screen">
    <n-gi span="0 m:4 l:4">
      <div id="logo"
           class=".center">
        <n-avatar style=" border-left-style: 20px;"
                  round
                  :size="50"
                  src="http://paper.fengyeqiulin.cn/1.png" />
      </div>
    </n-gi>
    <n-gi class="center"
          span="6 m:4 l:4">
      <HM />
    </n-gi>
    <n-gi class="center Reft"
          span="6 m:4 l:4">
      <div v-show="!Islogin">
        <HLRG />
      </div>
      <div v-show="Islogin">
        <Logined />
      </div>

    </n-gi>
  </n-grid>

</template>

<script>

import GlobalVue from '@/Global.vue';
import { watch, ref } from 'vue';
import HM from '../header/headMenu.vue';
import HLRG from '../header/head_login_regist_githob.vue'
import Logined from './logined.vue'


export default ({
  components: { HM, HLRG, Logined },
  setup () {
    const Islogin = ref(GlobalVue.IsLog.value);
    watch(() => GlobalVue.IsLog.value, function (nv, ov) {
      Islogin.value = nv;
    })

    // console.log(Islogin);

    return { Islogin }
  }
})
</script>
<style>
.center {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.Reft {
  justify-content: flex-end;
}
#logo {
  padding-top: 10px;
  padding-left: 30px;
}
</style>