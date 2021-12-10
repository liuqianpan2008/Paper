<template>

  <n-card title="❀ 关于投纸"
          embedded
          :bordered="false">
    <n-alert title="提示"
             type="info">
      签到可以获得查看次数（0~3）
    </n-alert>
    纸片发送要求
    <n-list bordered>
      <n-list-item>1.至少有1次发卡次数</n-list-item>
      <n-list-item>2.标题和内容违规（含色情暴力内容）拒绝发送且会扣除次数（需刷新）</n-list-item>
      <n-list-item>3.不得在公用发送占据大量屏幕或无意义卡片，这种卡片会被删除且根据严重程度扣除一定卡片次数</n-list-item>
    </n-list>
    <n-alert title="注意"
             type="warning">
      发送卡片会有次数限制，次数可以在每日签到中获取，当卡片库无卡片时候会提升无卡片查看
    </n-alert>

  </n-card>
  <n-card title="❀ 关于我的投纸"
          embedded
          :bordered="false">
    <n-alert title="提示"
             type="info">
      发纸是展示最新的纸片哦！
    </n-alert>
    我的投纸投纸是查看自己投放的纸片，比起捡纸的个人界面，发纸具有额外内容
    <n-list bordered>
      <n-list-item>1.可以删除未被查看卡片和公开卡片</n-list-item>
      <n-list-item>2.私用和公开具有tag标签标记</n-list-item>
    </n-list>
  </n-card>
</template>

<script>
export default {

}
</script>

<style>
</style>