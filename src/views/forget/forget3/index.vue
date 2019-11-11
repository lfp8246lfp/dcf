<template>
  <div id="success">
    <img src="../../../../static/images/success.png" alt="" class="successImg">
    <p>密码修改成功</p>
    <p>修改成功后<span>3</span>后自动跳转至<span>登录页</span></p>
    <el-button type="primary" @click="$router.push('/login')">立即登录</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    let span = document.getElementsByTagName('span')[0]
    let n = 3
    setInterval(() => {
      n--
      span.innerHTML = n > 0 ? n : 0
    }, 1000);
    this.turnLogin()
  },
  methods: {
    turnLogin () {
      setTimeout(() => {
        this.$router.push('/login')
      }, 3000);
    }
  }
}
</script>
<style lang='scss' scoped>
#success {
  height: 7.5rem;
  padding-bottom: 50px;
  text-align: center;
  .successImg {
    margin: 2.1rem 0 0.7rem;
  }
  p {
    margin-top: 0.2rem;
    font-size: 18px;
    span {
      color: rgb(77, 132, 251);
    }
  }
  .el-button {
    width: 100%;
    height: 0.78rem;
    margin-top: 0.5rem;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>