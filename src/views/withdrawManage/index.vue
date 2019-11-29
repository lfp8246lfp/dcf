<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="outline">
          <div class="left">
            <img src="../../../static/images/income.png" alt="">
          </div>
          <div class="right">
            <span>￥{{withdrawData.totalMoney}}</span>
            <p>累计总收入</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="outline">
          <div class="left">
            <img src="../../../static/images/income.png" alt="">
          </div>
          <div class="right">
            <span>￥{{withdrawData.cumbBalanceAmount}}</span>
            <p>累计提现收入</p>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="outline">
          <div class="left">
            <img src="../../../static/images/cash.png" alt="">
          </div>
          <div class="right">
            <span>￥{{withdrawData.withdrawalBalance}}</span>
            <p>可提现收入</p>
          </div>
          <el-button plain round class="el-icon-plus" @click="dialogFormVisible = true"> 新增提现</el-button>
        </div>
      </el-col>
    </el-row>

    <div class="withdrawDetail">
      <h3>提现记录</h3>
      <div class="data">
        <div class="datePicker">
          <el-date-picker
            v-model="date1"
            type="date"
            placeholder="选择开始日期">
          </el-date-picker>
          &nbsp;-&nbsp;
          <el-date-picker
            v-model="date2"
            type="date"
            placeholder="选择结束日期">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="getWithdrawDetail"></el-button>
        </div>
        <el-button class="fa fa-upload" style="float:right;margin-bottom:20px;margin:-41px 20px 0;">
            导出
        </el-button>
        <div class="table">
          <el-table
            :data="tableData"
            border
            stripe 
            style="width: 100%"
            :header-cell-style="{background:'rgb(250,250,250)'}">
            <el-table-column 
              type="index" 
              label="序号" 
              width="60">
            </el-table-column>
            <el-table-column
              prop="withdrawdate"
              label="提现时间"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="rechargevalue"
              label="提现金额">
            </el-table-column>
            <el-table-column
              prop="payid"
              label="用户姓名">
            </el-table-column>
            <el-table-column
              prop="provideDate"
              label="打款时间">
            </el-table-column>
            <el-table-column
              label="提现状态">
              <template slot-scope="scope">
                <span :class="scope.row.rechargetype | styleFilter">{{scope.row.rechargetype | stateFilter}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30]"
            :page-size="10"
            layout="prev, pager, next, sizes"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="新建提现申请" :visible.sync="dialogFormVisible" @closed="closeDialog">
      <el-form :model="form" :rules="addFormRules" ref="withdrawRef" label-width="28%">
        <el-form-item label="提现方式">
          <el-select v-model="form.withdrawtype" disabled>
            <el-option v-for="item in withdrawTypes" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="payid">
          <el-input v-model="form.payid"></el-input>
        </el-form-item>
        <el-form-item label="可提现金额">
          <el-input v-model="withdrawData.withdrawalBalance" disabled></el-input>
        </el-form-item>
        <el-form-item label="提现金额" prop="rechargevalue">
          <el-input v-model="form.rechargevalue"></el-input>
        </el-form-item>
        <el-form-item label="请注意：">
          <ul>
            <li>1.可提现余额仅包含用户充电收益，不包含运营商自己充电和退费的收益。</li>
            <li>2.提现需要后台审核，审核完成直接转帐到提现账号。</li>
            <li>3.填写姓名时，请使用您微信实名认证的姓名，否则会导致无法提现。</li>
            <li>4.单次提现金额不能小于100。</li>
            <li>5.单次提现金额不能超过5000。</li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWithdraw">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  data () {
    const validateName = (rule, value, callback) => {
        if (value.trim()) {
            return callback()
        } else {
            return callback(new Error('请输入姓名'))
        }
    }
    const validateMoney = (rule, value, callback) => {
        let reg = /^([1-9]\d{2}|[1-4]\d{3}|5000)$/
        if (reg.test(value.trim())) {
            return callback()
        } else {
            return callback(new Error('请输入正确的提现金额（100至5000）'))
        }
    }
    return {
      withdrawData: {
        totalMoney: 0,
        cumbBalanceAmount: 0,
        withdrawalBalance: 0,
      },
      tableData: [],
      date1: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      date2: new Date(),
      pageParams: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      dialogFormVisible: false,
      form: {
        withdrawtype: 3,
        payid: '',
        rechargevalue: ''
      },
      withdrawTypes: [
        {label: '公交卡', value: 1},
        {label: '天猫优惠券', value: 2},
        {label: '微信钱包', value: 3},
      ],
      addFormRules: {
        payid: [{ validator: validateName }],
        rechargevalue: [{ validator: validateMoney }]
      }
    };
  },
  methods:{
    getWithdrawDetail() {
      let params = {
        beginAt: this.dateFormat(this.date1),
        endAt: this.dateFormat(this.date2),
        ...this.pageParams
      }
      this.$request('withdrawDetail', {params}).then(res => {
        // console.log('提现数据', res)
        if (res.code === 200) {
          this.withdrawData.totalMoney = res.data.totalMoney
          this.withdrawData.cumbBalanceAmount = res.data.cumbBalanceAmount
          this.withdrawData.withdrawalBalance = res.data.withdrawalBalance
          this.tableData = res.data.items
          this.total = res.data.total
        }
      })
    },
    closeDialog() {
      this.form.payid = ''
      this.form.rechargevalue = ''
    },
    addWithdraw() {
      this.$refs.withdrawRef.validate(valid => {
        if (this.form.rechargevalue > this.withdrawData.withdrawalBalance) return this.$message.error('可提现金额不足')
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            if (!valid) return
            this.$request('addWithdrawLog', this.form).then(res => {
              // console.log('提现申请', res)
              if (res.data.returnCode === 1) {
                this.$message({
                  type: 'success',
                  message: '申请成功'
                })
                this.dialogFormVisible = false
                this.getWithdrawDetail()
              } else {
                this.$message({
                  type: 'error',
                  message: '申请失败'
                })
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
        })
      })
    },

    handleSizeChange(size) {
      this.pageParams.pageSize = size
      this.getWithdrawDetail()
    },
    handleCurrentChange(page) {
      this.pageParams.pageNum = page
      this.getWithdrawDetail()
    },

    dateFormat(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1 + '') + '-' + date.getDate() + '' + ' ' + (date.getHours() + '').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0') + ':' + (date.getSeconds() + '').padStart(2, '0')
    },
    formatter(row) {
      return this.dateFormat(new Date(row.withdrawdate))
    },
  },
  filters: {
    stateFilter(type) {
      switch (type) {
        case 1:
          return '待审核'
          break;
        case 2:
          return '审核'
          break;
        case 3:
          return '发放'
          break;
        case 4:
          return '结束'
          break;
      }
    },

    styleFilter(type) {
      switch (type) {
        case 1:
          return 'pending'
          break;
        case 2:
          return 'review'
          break;
        case 3:
          return 'withdraw'
          break;
        case 4:
          return 'finish'
          break;
      }
    }
  },
  mounted() {
    this.getWithdrawDetail()
  }
}
</script>
<style lang='scss' scoped>
.el-col {
  .outline {
    display: flex;
    height: 120px;
    color: #fff;
    border-radius: 3px;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 3;
      span {
        font-size: 36px;
      }
      p {
        font-size: 18px;
      }
    }
  }
  &:first-child {
    .outline {
      background: -webkit-linear-gradient(right, rgb(60,109,193), rgb(0,46,142));
    }
  }
  &:nth-child(2) {
    .outline {
      background: -webkit-linear-gradient(right, rgb(95,145,222), rgb(62,111,194));
    }
  }
  &:last-child {
    .outline {
      position: relative;
      background: -webkit-linear-gradient(right, rgb(122,174,245), rgb(96,147,223));
      .el-button {
        position: absolute;
        right: 20px;
        top: 50%;
        width: 140px;
        height: 40px;
        color: rgb(97,148,224);
        font-size: 14px;
        transform: translate(0, -50%);
      }
    }
  }
}

.withdrawDetail {
  background-color: #fff;
  border: 1px solid rgb(238,238,238);
  border-radius: 3px;
  margin-top: 20px;
  h3 {
    font-size: 16px;
    font-weight: 400;
    color: rgb(48,49,51);
    border-bottom: 1px solid rgb(238,238,238);
    padding: 20px;
    margin-bottom: 20px;
  }
  .data {
    .datePicker {
      display: flex;
      margin-left: 20px;
      line-height: 40px;
      .el-button {
        width:40px;
        height:40px;
        padding:0;
        text-align:center;
        border-top-left-radius:0;
        border-bottom-left-radius:0;
      }
    }
    .table {
      margin: 20px;
    }
    .page {
      height: 80px;
      margin: 20px;
      margin-top: -20px;
      border: 1px solid rgb(238,238,238);
      border-top: 0;
      .el-pagination {
        margin-top: 20px;
        float: right;
        /deep/ button {
          border: 1px solid rgb(217,217,217);
          margin-left: 10px;
          border-radius: 3px;
        }
        /deep/ .el-pager {
          li {
            border: 1px solid rgb(217,217,217);
            margin-left: 10px;
            border-radius: 3px;
            &.active {
              border-color: rgb(24,144,255);
              color: rgb(24,144,255);
            }
          }
        }
        /deep/ .el-pagination__sizes {
          margin-left: 20px;
          border-radius: 3px;
        }
      }
    }
  }
}

.el-dialog {
  .el-form-item {
    &:first-child {
      /deep/ .el-input__inner {
        background-color: rgb(245,247,250)!important;
      }
    }
    &:last-child {
      margin: 0;
      /deep/ .el-form-item__label {
        color: #f00;
        font-size: 12px;
        line-height: 20px;
      }
      ul {
        color: rgb(144,147,153);
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
}

.pending {
  color: #f00;
}
.review {
  color: #ff0;
}
.withdraw {
  color: #0f0;
}
.finish {
  color: #000;
}
</style>