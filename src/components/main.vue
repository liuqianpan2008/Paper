<template>
<div class="juzhong">
    <n-space vertical>
            <n-gradient-text :size="74" gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)"> 开始你的纸片吧 </n-gradient-text>
            <n-space justify="center">
                <n-button size="large" type="info" @click="Pick">捡纸片</n-button>
                <n-button size="large" type="info" @click="Throw">扔纸片</n-button>
            </n-space>
    </n-space>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return{
            Pick:()=>{
                location.href="#/PaperCut/CollectCards";
            },
            Throw:()=>{

                location.href="#/sendpaper/PaperCard";
            }
        }
    },
})
</script>

<style>
 .juzhong{
     height: inherit;
     display: flex;
    align-items: center;
    justify-content: center;
 }
</style>