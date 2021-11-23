<template>
     <n-card title="登录" id="login"> 
          <n-form :show-require-mark="false" :model="loginV" :rules="rules" ref="loginRef">
               <n-form-item label="用户名" path="user">
                    <n-input  placeholder="输入用户名" v-model:value="loginV.user"/>
                </n-form-item>
                <n-form-item label="密码" path="passworld" >
                    <n-input type="password" show-password-on="mousedown" placeholder="请输入密码" v-model:value="loginV.passworld" />
                </n-form-item>
                <n-form-item label="验证码" path="Code">
                    <n-input  placeholder="输入验证码" v-model:value="loginV.Code"/>
                </n-form-item>
                <PicCode :width="200" :height="50" v-model:Code="Code" />
                 <n-form-item>
                        <n-button @click="login" attr-type="button">登录</n-button>
                </n-form-item>
          </n-form>
    </n-card>
</template>
<script lang="ts">
import axios from 'axios';
import {ref} from 'vue';
import Globat from '../Global.vue';
import { FormItemRule, useMessage } from 'naive-ui';
import PicCode from "@/components/PicCode/PicCode.vue";
export default ({
    components: { PicCode },
    setup() {
        const loginV=ref({user:'',passworld:'',Code:''})
        const loginRef=ref();
        const message = useMessage()
        const Code = ref(1);
        const login=()=>{
            loginRef.value.validate(async(errors: any)=>{
                if (!errors) {
                    axios.post("api/login.php",{
                        user:loginV.value.user,
                        passworld:loginV.value.passworld
                    })
                    .then((response)=>{
                        const   info=response.data.info;
                        console.log(response.data);
                       if(response.data.cod=="103"){
                            Globat.User.value=loginV.value.user;
                            Globat.sex.value=response.data.sex;
                            Globat.loged.value=false;
                            // Globat.number.value=response.data.number
                            //储存到本地
                            localStorage.setItem('user',Globat.User.value);
                            localStorage.setItem('sex',Globat.sex.value);
                            localStorage.setItem('kay',response.data.kay);
                            localStorage.setItem('loged',"false");
                            message.success(info);
                            location.href='./#/';   
                        }else{
                            message.error(info);
                        }
                    }).catch(()=> {
                        message.error("访问API服务器失败");
                    });
                }
            })
        }

        return{
            loginV,loginRef,login,useMessage,Code,
            rules:{
                user:{
                    required:true,
                    trigger: ['input', 'blur'],
                    validator:(rule: FormItemRule, value: any)=>{
                        if(value==""){
                            return new Error('请输入用户名')
                        }
                        if (value.search(/^[a-zA-Z0-9_]{3,16}$/ )<0) {
                            return new Error('请输入正确用户名！')
                        }
                    }
                },
                passworld:{
                    required:true,
                    trigger: ['input', 'blur'],
                    validator:(rule: FormItemRule, value: any)=>{
                        if(value==""){
                            return new Error('请输入密码')
                        }
                    }
                },
                Code:{
                    required:true,
                    trigger: ['input', 'blur'],
                    validator:(rule: FormItemRule, value: any)=>{
                        if(value==""){
                            return new Error('请输入验证码')
                        }
                        if(value!=Code.value){
                            return new Error('验证码不正确')
                        }
                    }
                }
            }
        }

    }
})
</script>

<style>
/* #login {
  max-width: 500px;
} */


</style>