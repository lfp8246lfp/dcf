<template>
  <div>
    <h1>找回密码</h1>
    <el-form ref="form" :model="form" style="border-bottom:1px solid #eee">
      <el-form-item>
        <h3>手机号</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../../static/images/mob.png" alt="">
          </div>
          <input type="text" v-model="form.mob" placeholder="请输入手机号">
        </div>
      </el-form-item>
      <el-form-item>
        <h3>验证码</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../../static/images/verify.png" alt="">
          </div>
          <input type="text" v-model="form.msg" placeholder="请输入验证码" style="width:4rem">
          <el-button class="getMsgBtn" type="primary" plain @click="getMsg">获取验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button class="nextBtn" type="primary" @click="nextStep">下一步</el-button>
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
        mob: '',
        msg:''
      },
      authCode: ''
    };
  },
  methods: {
        getMsg () {
          if (this.form.mob.trim()) {
              let reg = /^1[3456789]\d{9}$/
              if (reg.test(this.form.mob)) {
                this.$request('sendMessage', {params: {phone: this.form.mob}}).then(res => {
                    console.log(res)
                    if (res.data.returnCode == 0) {
                        this.$message({
                          type: 'success',
                          message: res.data.returnMsg
                        })
                        this.authCode = res.data.authCode
                    }
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '手机号格式错误，请重新输入'
                })
              }
          } else {
              this.$message({
                    type: 'warning',
                    message: '请输入手机号'
              })
          }
        },
        nextStep () {
          if (this.form.msg.trim().length > 0) {
              if (this.form.msg === this.authCode) {
                sessionStorage.setItem('mob', this.form.mob)
                sessionStorage.setItem('auth', this.authCode)
                this.$router.push('/forget2')
              } else {
                this.$message({
                    type: 'error',
                    message: '验证码错误'
                })
              }
          } else {
              this.$message({
                  type: 'error',
                  message: '请填写验证码'
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
  .getMsgBtn {
    float: right;
    width:2.2rem;
    height:0.94rem;
    background-color: #fff;
    color: rgb(77,132,251);
  }
}

.el-checkbox {
  float:left;
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