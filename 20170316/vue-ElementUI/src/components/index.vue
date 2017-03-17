<template>
 <div class="activePublic ">
  <!-- 步骤组件 -->
  <el-steps :space="200" :active="step" class="step">
  <el-step title="活动信息" description=""></el-step>
  <el-step title="报名签到" description=""></el-step>
  <el-step title="分享设置" description=""></el-step>
  <el-step title="个性设置" description=""></el-step>
  </el-steps>
  <!-- 视图 -->
  <router-view class="view"></router-view>
  <div class="but-group">
  <el-button >预览</el-button>
  <el-button >上一步</el-button>
  <el-button type="primary">下一步</el-button>
  <el-button type="primary">发布活动</el-button>
  </div>
 </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
