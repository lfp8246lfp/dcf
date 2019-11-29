<template>
  <div>
    <h1>找回密码</h1>
    <el-form ref="form" :model="form" label-position="top" :rules="changeRules">
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" placeholder="请输入密码">
          <template slot="prepend">
            <img src="../../../../static/images/lock.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirm">
        <el-input v-model="form.confirm" placeholder="请再次输入密码">
          <template slot="prepend">
            <img src="../../../../static/images/lock.png" alt="">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="nextBtn" type="primary" @click="confirmBtn">注册</el-button>
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
      },
      changeRules: {
        pwd: [
          { 
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ],
        confirm: [
          { 
            required: true,
            message: '请重新输入密码',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
        confirmBtn () {
          this.$refs.form.validate(valid => {
            if (!valid) return
            if (this.form.pwd === this.form.confirm) {
              let obj = {
                loginid: sessionStorage.getItem('mob'),
                smscode: sessionStorage.getItem('auth'),
                password: this.form.pwd
              }
              this.$request('findPassword', obj).then(res => {
                if (res.data.returnCode === 1) {
                  // console.log(res)
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
          })
        },
    }
}
</script>
<style lang='scss' scoped>
h1{
  font-size: 27px;
  font-weight: 400;
  margin-bottom: 0.6rem;
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
    .nextBtn {
      width: 100%;
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