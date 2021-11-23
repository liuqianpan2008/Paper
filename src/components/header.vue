<template>
    <n-grid  :cols="3" item-responsive responsive="screen">
    <n-gi>
      <div id="logo" class=".center">
          <n-avatar style=" border-left-style: 20px;" round :size="70" src="https://s3.bmp.ovh/imgs/2021/11/b398bb54cd64c915.png"/>
      </div>
    </n-gi>
    <n-gi class="center" span="0 m:1 l:1">
        <HM />
    </n-gi>
    <n-gi class="center Reft" span="2 m:1 l:1">
      <div v-show="Islogin">
        <HLRG  />
      </div>
      <div v-show="!Islogin">
        <Logined  />
      </div>
        
    </n-gi>
  </n-grid>
  
</template>

<script>

import GlobalVue from '@/Global.vue';
import { watch,ref  } from 'vue';
import HM from './headMenu.vue';
import HLRG from './head_login_regist_githob.vue'
import Logined from './logined.vue'


export default ({
    components:{HM,HLRG,Logined},
    setup() {
      const Islogin= ref(GlobalVue.loged.value) ;
      watch(()=>GlobalVue.loged.value,function(nv,ov){
        Islogin.value=nv;
      })
      
      // console.log(Islogin);

      return{Islogin}
    }
})
</script>
<style>
.center{
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.Reft{
  justify-content: flex-end;
}
#logo{
  padding-top:10px ;
  padding-left:30px
}
</style>