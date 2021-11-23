<template>
    <n-card title="注册" id="register">
          <n-form :show-require-mark="false" :model="registerV" :rules="rules" ref="registerRef">
               <n-form-item label="用户名" path="user">
                    <n-input  placeholder="请输入" v-model:value="registerV.user"/>
                </n-form-item>

                <n-form-item label="密码" path="passworld" >
                    <n-input type="password" show-password-on="mousedown" placeholder="请输入" v-model:value="registerV.passworld" />
                </n-form-item>
                <n-form-item label="确认密码" path="passworld1" >
                    <n-input type="password" show-password-on="mousedown" placeholder="请输入" v-model:value="registerV.passworld1" />
                </n-form-item>
                <n-form-item label="性别" path="sex">

                    <n-radio-group v-model:value="registerV.sex" name="nan_nv">
                        <n-radio  value="男" :checked="1===1">男</n-radio>
                        <n-radio  value="女" >女</n-radio>
                    </n-radio-group>
                    
                </n-form-item>
                 <n-form-item>
                    <n-button @click="registerBtn" attr-type="button">注册</n-button>
                </n-form-item>
          </n-form>
            <!-- {{JSON.stringify(registerV)}} -->
    </n-card>
    
</template>

<script lang="ts">
import { FormItemRule } from 'naive-ui';
import { defineComponent,ref } from 'vue'
import { useMessage } from 'naive-ui';
import axios from 'axios';

export default defineComponent({
    setup() {
     const registerV=ref({user:'',passworld:'',passworld1:"",sex:""})
    const registerRef=ref();
    const message = useMessage()
    const registerBtn=()=>{
        registerRef.value.validate(async(errors: any)=>{
            if (!errors) {
                axios.post("api/Register.php",{
                        user:registerV.value.user,
                        passworld:registerV.value.passworld,
                        sex:registerV.value.sex,
                }).then((response)=>{
                    const   info=response.data.info;
                    console.log(response.data);
                    
                     if(response.data.cod=="100"){
                        message.error(info);
                    }
                    if(response.data.cod=="101"){
                        message.error(info);
                    }
                    if(response.data.cod=="102"){
                        message.success(info);
                        location.href='#/login';
                    }
                }).catch( ()=> {
                        message.error("访问API服务器失败");
                });
            }
        })
    }


        return{
            registerV,registerBtn,registerRef,
            rules:{
                user:{
                    required:true,
                    trigger: ['input', 'blur'],
                    validator:(rule: FormItemRule, value: any)=>{
                        if(value==""){
                            return new Error('请输入用户名')
                        }
                        if (value.search(/^[a-zA-Z0-9_]{3,16}$/ )<0) {
                            return new Error('请保持用户名不含中文，且位数在3-16位')
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
                        if (value.search(/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)]).*$/ )<0) {
                            return new Error('请保持密码6-16位且至少含有1个数字，1个小写字母，1个大写字母，1个特殊字符')
                        }
                    }
                },
                passworld1:{
                   required:true,
                    trigger: ['input', 'blur'],
                    validator:(rule: FormItemRule, value: any)=>{
                        if(value==""){
                            return new Error('请再次输入密码')
                        }
                        if(value===registerV.value.passworld){
                            return true;
                        }else{
                            return new Error('两次密码不一致')
                        }
                    }
                },
                sex:{
                    required: true,
                    trigger: 'change',
                    message: '请选择性别'
                }
            },
        }
    }
                
    
})
</script>
<style>
/* #register{
      max-width: 500px;
} */
</style>