<template>
  <n-space vertical>
    <n-card title="项目介绍">
      本项目前端为开源项目（<a href="https://github.com/liuqianpan2008/Paper">GitHub（前端）</a>后端写的太烂+有些个人东西没弄好暂不开源）<br>
      项目灵感来源于抖音广场上的相亲投纸片<br>
    </n-card>
    <n-card title="未来计划">
      <n-space vertical>
        <n-checkbox :checked="true">一个简单的说明界面</n-checkbox>
        <n-checkbox :checked="true">简易聊天室</n-checkbox>
        <n-checkbox checked="true">好友功能</n-checkbox>
        <n-checkbox checked="true">安卓端(长远)</n-checkbox>
        <n-checkbox checked="true">pc端(长远)</n-checkbox>
      </n-space>
    </n-card>
    <n-card title="相关技术">
      <n-space vertical>
        前端：vue3 + Naive UI <br>
        后端：SpringBoot + Sa-Token（鉴权）+ AJ-Captcha（验证码）
      </n-space>
    </n-card>
    <n-card title="帮助我们">
      加快我们开发，请投喂我们！
      <n-tabs type="line"
              size="large"
              :tabs-padding="20"
              pane-style="padding: 20px;">
        <n-tab-pane name="支付宝"><img src="../../assets/zfb.jpg"
               width="300"></n-tab-pane>
        <n-tab-pane name="微信"><img src="../../assets/wx.png"
               width="300"></n-tab-pane>
      </n-tabs>
      所有的赞助将在这里公示（排名不分先后）感谢各位股东爸爸
      <n-table :bordered="false"
               :single-line="false">
        <thead>
          <tr>
            <th>赞助人</th>
            <th>赞助金额</th>
            <th>赞助时间</th>
            <th>留言</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>admin</td>
            <td>0</td>
            <td>2021年12月10日19:29:19</td>
            <td>感谢大佬投喂</td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
    <n-card title="更新日志">
      <n-timeline>
        <n-timeline-item content="前面的记不清了，这里开始吧" />
        <n-timeline-item type="success"
                         title="v0.1.2"
                         content="新增在线聊天室bata"
                         time="2021年12月11日09:09:48" />
        <n-timeline-item type="success"
                         title="v0.1.3"
                         content="在线聊天室bata实现QQ互联,且新增举报按钮！"
                         time="2021年12月11日09:09:48" />
      </n-timeline>
    </n-card>
  </n-space>
</template>

<script>
export default {
  setup () {
    return {}
  }

}
</script>

<style>
</style>