<template>
  <div>
    <h1>找回密码</h1>
    <el-form ref="form" :model="form" style="border-bottom:1px solid #eee">
      <el-form-item>
        <h3>密码</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../../static/images/lock.png" alt="">
          </div>
          <input type="password" v-model="form.pwd" placeholder="请输入密码">
        </div>
      </el-form-item>
      <el-form-item>
        <h3>确认密码</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../../static/images/lock.png" alt="">
          </div>
          <input type="password" v-model="form.confirm" placeholder="请再次输入密码">
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="nextBtn" type="primary" @click="confirmBtn">确定</el-button>
      </el-form-item>
    </el-form>
    <p class="login">已有账号？<a href="/login">去登录</a></p>
  </div>
</template>
<script>
export default {
  data () {

    return {
        form: {
            pwd: '',
            confirm:''
        }
    };
  },
  methods: {
        confirmBtn () {
          if (this.form.pwd.trim().length > 0) {
            if (this.form.pwd === this.form.confirm) {
              let params = {
                loginid: sessionStorage.getItem('mob'),
                smscode: sessionStorage.getItem('auth'),
                password: this.form.pwd
              }
              this.$request('findPassword', params).then(res => {
                if (res.data.returnCode === 1) {
                  console.log(res)
                  this.$message({
                      type: 'success',
                      message: res.data.returnMsg
                  })
                  sessionStorage.clear()
                  this.$router.push('/forget3')
                } else {
                  this.$message({
                      type: 'error',
                      message: res.data.returnMsg
                  })
                }
              })
            } else {
              this.$message({
                type: 'error',
                message: '两次输入的密码不一致'
              })
            }
          } else {
            this.$message({
              type: 'error',
              message: '请输入密码'
            })
          }
        },
    }
}
</script>
<style lang='scss' scoped>
h1{
  font-size: 27px;
  font-weight: 400;
  /* text-align: center; */
  margin-bottom: 0.6rem;
}

h3 {
  font-size: 14px;
  font-weight: 400;
}

a {
  color: rgb(77,132,251)
}

.el-form-item {
  width: 100%;
  margin-bottom: 0.2rem;
}

.ipt {
  width: 100%;
  height: 0.94rem;
  box-sizing: border-box;
  .icon {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.94rem;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid rgb(228, 231, 237);
  }
  input {
    float: left;
    width: 6.8rem;
    height: 100%;
    padding-left: 15px;
    margin-bottom: 0.1rem;
    border: 1px solid rgb(228, 231, 237);
    border-left: 0;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1000px #fff!important;
  }
}

.nextBtn {
  width:100%;
  height:0.78rem;
  margin: 0.3rem 0;
  font-weight: 700;
}

.login {
  margin-top: 0.7rem;
}
</style>