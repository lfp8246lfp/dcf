<template>
    <div>
      <h1>登录</h1>
    <el-form ref="form" :model="form" :rules="loginRules" style="border-bottom:1px solid #eee">
      <el-form-item prop="accountid">
        <h3>手机号</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../static/images/mob.png" alt="">
          </div>
          <input type="text" v-model="form.accountid" placeholder="请输入手机号">
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <h3>密码</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../static/images/lock.png" alt="">
          </div>
          <input type="password" v-model="form.password" placeholder="请输入密码">
        </div>
        <p style="text-align:right">
          <a href="/forget1">忘记密码?</a>
        </p>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remember">记住密码</el-checkbox>
        <el-button type="primary" @click="login" :loading="loading">{{$t('common.login')}}</el-button>
      </el-form-item>
    </el-form>
    <p class="register">没有账号？<a href="/register1">去注册</a></p>
    </div>
</template>

<script>

export default {
    data () {
        const validateUsername = (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error('请输入手机号'));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error('密码长度错误'));
            } else {
                callback();
            }
        };
        return {
            loginRules: {
                accountid: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            loading: false,
            form: {
                accountid: '',
                password: ''
            },
            remember: false
        };
    },
    methods: {
        login () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$request('login', this.form).then(res => {
                      console.log(res)
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
                    });
                }
            });
        },
    }
};
</script>


<style lang="scss" scoped>

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
  margin-bottom: 0.2rem;
}

.ipt {
  width: 100%;
  height: 0.94rem;
  box-sizing: border-box;
  border: 1px solid rgb(228, 231, 237);
  .icon {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 0.94rem;
    height: 100%;
    box-sizing: border-box;
  }
  input {
    float: left;
    width: 6.8rem;
    height: 100%;
    padding-left: 15px;
    margin-bottom: 0.1rem;
    border-left: 1px solid rgb(228, 231, 237);
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1000px #fff!important;
  }
}

.el-checkbox {
  float:left;
}

.el-button {
  float:right;
  width:2.65rem;
  height:0.78rem;
  margin-bottom: 0.2rem;
}

.register {
  margin-top: 0.7rem;
}


</style>

