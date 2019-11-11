<template>
  <div id="sublayout">
    <el-container>

      <el-header>

        <div class="logo" style="display:inline-block;">
          <img src="../../../static/images/logoImg.png" alt="" height="40">
        </div>

        <i class="fa fa-bars toggleMemu" @click="toggleMenu"></i>
        
        <div class="pull-right" style="height: 70px;">

          <!-- <div class="message pull-left" style="height: 70px;" @click="event">
            <el-badge :value="0" class="item" >
              <img src="../../../static/images/bell.png" alt="" width="24">
            </el-badge>
          </div> -->

          <div class="user_box pull-left">
            <img src="../../../static/images/user.png" alt="" width="24">
            {{accountId}}
            <i class="fa fa-caret-down" style="color:#fff"></i>
            <div class="user_manage">
              <p @click="dialogVisible = true"><i class="el-icon-key"></i>修改密码</p>
              <p @click="loginOut"><i class="fa fa-sign-out"></i>退出登录</p>
            </div>
          </div>

        </div>

      </el-header>

      <el-container>
        <side-bar :isCollapse="isCollapse"></side-bar>
        <el-main>
          <tags-view></tags-view>
          <div style="padding:0.31rem 0.31rem 0;background:#f4f6fb;box-sizing:border-box;">
            <router-view></router-view>
            <p class="Copyright">Copyright Company © 2014-2019</p>
          </div>
        </el-main>
      </el-container>


      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="640px">

        <el-form ref="formRef" :model="form" :rules="changePwdRules" label-width="190px">
          <el-form-item label="当前密码" prop="pwdOld">
            <el-input v-model="form.pwdOld"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pwdNew">
            <el-input v-model="form.pwdNew"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirm">
            <el-input v-model="form.confirm"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePwd">确 定</el-button>
        </span>

      </el-dialog>

    </el-container>
  </div>
</template>

<script>
import TagsView from './TagsView/TagsView.vue';
import SideBar from './SideBar/SideBar.vue';

export default {
    components: {
        TagsView,
        SideBar,
    },
    data () {
      const validatePwdOld = (rule, value, callback) => {
          if (!value.trim()) {
              callback(new Error('请输入原密码'))
          } else {
              callback()
          }
      };
      const validatePwdNew = (rule, value, callback) => {
          if (!value.trim()) {
              callback(new Error('密码不能为空'))
          } else if (value.trim().length < 6) {
              callback(new Error('密码至少为6位'))
          } else if (value === this.form.pwdOld) {
              callback(new Error('不能与原密码相同'))
          } else {
            callback()
          }
      };
      const validateConfirm = (rule, value, callback) => {
          if (value !== this.form.pwdNew) {
              callback(new Error('两次密码不一致'))
          } else {
              callback()
          }
      };
        return {
            accountId: localStorage.getItem('accountid'),
            dialogVisible: false,
            form: {
              pwdOld: '',
              pwdNew: '',
              confirm: '',
            },
            isCollapse: true,
            changePwdRules: {
              pwdOld: [{ required: true, trigger: 'blur', validator: validatePwdOld }],
              pwdNew: [{ required: true, trigger: 'blur', validator: validatePwdNew }],
              confirm: [{ required: true, trigger: 'blur', validator: validateConfirm }]
            }
        };
    },

    methods: {
        loginOut () {
            this.$confirm(
                '确定要退出登录吗？',
                '提醒',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                localStorage.removeItem('HTTP_ACCESS_TOKEN')
                this.$router.push('/login')
            })
        },
        changePwd () {
            this.$confirm(
                '确定要修改密码吗？',
                '提醒',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            ).then(() => {
                this.$refs.formRef.validate(valid => {
                  if (!valid) return
                  this.$request('updatePassword', {oldpassword: this.form.pwdOld, newpassword: this.form.pwdNew}).then(res => {
                    console.log('修改密码', res)
                    if (res.data.returnCode === 1) {
                      this.$message.success(res.data.returnMsg)
                      this.dialogVisible = false
                      localStorage.removeItem('HTTP_ACCESS_TOKEN')
                      this.$router.push('/login')
                    } else {
                      this.$message.error(res.data.returnMsg)
                    }
                  })
                })
            })
        },
        toggleMenu () {
          this.isCollapse = !this.isCollapse;
        },
        event(){
          this.eventDialog = true;
        },
        eventClose(){
          this.eventDialog = false
        },
    }
};
</script>

<style lang='scss'>
#sublayout {
  overflow-y: auto;
}
.el-container {
  height: 100vh;
}
.el-header {
  background: url(../../../static/images/headerbg.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  height: 70px !important;
  line-height: 70px;
  position: relative;
  .logo{
    position: absolute;
    left: 25px;
    top: 15px;
    line-height: 100%;
    img{
      vertical-align: middle;
      display: inline-block;
    }
    span{
      display: inline-block;
      font-size: 0.375rem;
      margin-left: 0.2rem;
    }
  }

  .user_box {
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    margin: 0 15px;
    img {
      margin-right: 10px;
      vertical-align: middle;
    }
    i {
      margin-left: 5px;
    }
    .user_manage {
      position: absolute;
      width: 220px;
      right: 37px;
      z-index: 12;
      background-color: #fff;
      color: rgb(102,102,102);
      display: none;
      p {
        height: 50px;
        font-size: 14px;
        line-height: 50px;
        padding: 0 30px;
        cursor: pointer;
        &:hover {
          background-color: #ccc;
        }
      }
    }
    &:hover {
      .user_manage {
        display: block;
      }
    }
  }


  .message {
    cursor: pointer;
    margin-right: 23px;
    color: #b7b7b7;
    font-size: 30px;
    .el-badge__content.is-fixed {
      top: 20px;
      right: 14px;
    }
    .el-badge__content {
      height: 15px;
      line-height: 15px;
    }
  }
  .dgk_logo {
    display: inline-block;
    width: 42px;
    height: 42px;
    vertical-align: middle;
    margin-right: 15px;
    cursor: pointer;
  }
}

.el-dialog {
  .el-input__inner {
    width: 200px;
    height: 30px;
  }
}

.el-aside {
  background-color: #ffffff;
  line-height: 800px;
}

.el-main {
  background-color: #f2f4fa;
  color: #333;
  padding: 0;
  .Copyright {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  border-right: none;
}
.el-submenu__title {
  text-align: left;
}
.el-menu-item {
  text-align: left;
}
.el-submenu .el-menu-item {
  padding-left: 50px;
  text-align: left;
}
.el-menu--popup-right-start {
  margin-left: 0;
}
.toggleMemu {
  position:absolute;
  left:270px;
  top:25px;
  font-size:24px;
  color:#fff;
  cursor: pointer;
}
</style>
