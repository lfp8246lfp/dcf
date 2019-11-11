<template>
    <div>
      <h1>登录</h1>
      <el-form ref="form" :model="form" label-position="top" :rules="loginRules">
        <el-form-item label="手机号" prop="accountid">
          <el-input v-model="form.accountid" placeholder="请输入手机号">
            <template slot="prepend">
              <img src="../../../static/images/mob.png" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码">
            <template slot="prepend">
              <img src="../../../static/images/lock.png" alt="">
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <p style="text-align:right">
            <a href="/forget1">忘记密码?</a>
          </p>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember">记住密码</el-checkbox>
          <el-button type="primary" @click="login" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <p class="register">没有账号？<a href="/register1">去注册</a></p>
    </div>
</template>

<script>

export default {
    data () {
        return {
            loading: false,
            form: {
                accountid: '',
                password: ''
            },
            remember: false,
            loginRules: {
              accountid: [
              { 
                required: true,
                message: '手机号不能为空',
                trigger: 'blur'
              }
              ],
              password: [
              { 
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
              }
              ],
            }
        };
    },
    methods: {
        login () {
            this.$refs.form.validate(valid => {
                if (valid) {
                  this.loading = true
                  this.$request('login', this.form).then(res => {
                      console.log('登录', res)
                      if (res.data.success == "1") {
                          localStorage.setItem('HTTP_ACCESS_TOKEN', res.data.HTTP_ACCESS_TOKEN)
                          localStorage.setItem('accountid', this.form.accountid)
                          this.$message({
                              message: '登录成功',
                              center: true,
                              type: 'success'
                          });
                          this.$router.push('/index')
                      } else {
                          this.$message({
                              message: "登录失败",
                              center: true,
                              type: 'error'
                          });
                      }
                      this.loading = false;
                  })
                }
            });
        },
    }
};
</script>


<style lang="scss" scoped>

h1{
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 0.6rem;
}

a {
  color: rgb(77,132,251);
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
    .el-button {
      float: right;
      width: 170px;
      height: 50px;
      margin-bottom: 10px;
      font-weight: 700;
    }
  }
}


.register {
  margin-top: 0.7rem;
}


</style>

