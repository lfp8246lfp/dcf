<template>
  <div>
    <h1>找回密码</h1>
    <el-form ref="form" :model="form" label-position="top" :rules="changeRules">
      <el-form-item label="手机号" prop="mob">
        <el-input v-model="form.mob" placeholder="请输入手机号">
          <template slot="prepend">
            <img src="../../../../static/images/mob.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-row :gutter="40">
          <el-col :span="16">
            <el-input v-model="form.msg" placeholder="请输入验证码">
              <template slot="prepend">
                <img src="../../../../static/images/verify.png" alt="">
              </template>
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-button class="getMsgBtn" type="primary" plain @click="getMsg">获取验证码</el-button>
          </el-col>
        </el-row>
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
      authCode: '',
      changeRules: {
        mob: [
        { 
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        },
        {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
         }
        ],
      }
    };
  },
  methods: {
        getMsg () {
          this.$refs.form.validate(valid => {
            if (!valid) return
            this.$request('sendMessage', {phone: this.form.mob}).then(res => {
                console.log('发送验证码', res)
                if (res.data.returnCode == 0) {
                  this.$message({
                      type: 'success',
                      message: res.data.returnMsg
                  })
                  this.authCode = res.data.authCode
                }
            })
          })
        },
        nextStep () {
          if (this.authCode.length > 0) {
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

.el-form {
  border-bottom: 1px solid #eee;
  .el-form-item {
    margin-bottom: 0.2rem;
    .el-input {
      height: 0.94rem;
      /deep/ .el-input-group__prepend {
        box-shadow: inset 0 0 0 1000px #fff!important;
      }
      /deep/ .el-input__inner {
        height: 100%;
        box-shadow: inset 0 0 0 1000px #fff!important;
      }
    }
    .el-checkbox {
      float:left;
    }
    .getMsgBtn {
      width: 100%;
      height: 0.94rem;
      background-color: #fff;
      color: rgb(77,132,251);
    }
    .nextBtn {
      width:100%;
      height: 50px;
      margin: 50px 0 30px;
      font-weight: 700;
    }
  }
}

.login {
  margin-top: 0.7rem;
}
</style>