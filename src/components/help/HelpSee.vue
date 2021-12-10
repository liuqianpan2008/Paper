<template>
  <n-card title="❀ 关于捡纸"
          embedded
          :bordered="false">
    <n-alert title="提示"
             type="info">
      签到可以获得查看次数（0~3）
    </n-alert>
    随机在卡片库内发送一张具有满足以下特点的卡片
    <n-list bordered>
      <n-list-item>1.非公开卡片</n-list-item>
      <n-list-item>2.非自己卡片</n-list-item>
      <n-list-item>2.未被别人查看卡片</n-list-item>
    </n-list>
    <n-alert title="注意"
             type="warning">
      查看卡片会有次数限制，次数可以在每日签到中获取，当卡片库无卡片时候会提升无卡片查看
    </n-alert>

  </n-card>
  <n-card title="❀ 关于我的捡纸"
          embedded
          :bordered="false">
    <n-alert title="提示"
             type="info">
      捡纸是展示最新的纸片哦！
    </n-alert>
    捡纸是查看自己捡到的纸片，

  </n-card>
</template>

<script>
export default {

}
</script>

<style>
</style>