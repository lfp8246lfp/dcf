<template>
  <div>
    <h1>找回密码</h1>
    <el-form ref="form" :model="form" :rules="registerRules" style="border-bottom:1px solid #eee">
      <el-form-item prop="mob">
        <h3>密码</h3>
        <div class="ipt">
          <div class="icon">
            <img src="../../../../static/images/lock.png" alt="">
          </div>
          <input type="password" v-model="form.pwd" placeholder="请输入密码">
        </div>
      </el-form-item>
      <el-form-item prop="msg">
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
    const validateUsername = (rule, value, callback) => {
            if (!value.trim()) {
                callback(new Error(this.$t('login.accountErr')));
            } else {
                callback();
            }
        };
        const validatePassword = (rule, value, callback) => {
            if (value.length < 3) {
                callback(new Error(this.$t('login.passErr')));
            } else {
                callback();
            }
        };

    return {
      registerRules: {
                mob: [{ required: true, trigger: 'blur', validator: validateUsername }],
                msg: [{ required: true, trigger: 'blur', validator: validatePassword }]
            },
            form: {
                pwd: '',
                confirm:''
            }
    };
  },
  methods: {
        confirmBtn () {
          this.$router.push('/forget3')
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