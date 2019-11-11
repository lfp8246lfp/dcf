<template>
  <div>
    <div class="priceManage">
      <el-tabs v-model="active" type="card" style="padding: 10px;">
        <el-tab-pane label="电表电价" name="first">
            <h2>电表电价</h2>
            <div class="btns">
              <button class="el-icon-plus" @click="openDialog(1)"> 新增</button>
            </div>
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
                    prop="pricename"
                    label="电价名称">
                  </el-table-column>
                  <el-table-column
                    prop="pricevalue"
                    label="电价（元/kWh）">
                  </el-table-column>
                  <el-table-column
                    label="使用状态">
                    <template slot-scope="scope">
                      <span :class="scope.row.totalused ? 'used' : 'unused'">{{scope.row.totalused ? '已使用' : '未使用'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-tooltip effect="dark" content="编辑价格" placement="top-start">
                        <el-button size="mini" class="el-icon-edit" @click="openDialog(2, scope.row)" :disabled="!!scope.row.totalused"></el-button>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="删除价格" placement="top-start">
                        <el-button size="mini" class="el-icon-delete-solid" @click="deletePrice(scope.row)" :disabled="!!scope.row.totalused"></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
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
            <el-dialog :title="opttype === 1 ? '新增电价' : '修改电价'" :visible.sync="dialogFormVisible" width="40%">
              <el-form :model="form" label-width="28%">
                <el-form-item label="电价名称">
                  <el-input v-model="form.pricename"></el-input>
                </el-form-item>
                <el-form-item label="电价（元/kWh）">
                  <el-input v-model="form.pricevalue"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="opttype === 1 ? addPrice() : editPrice()">确 定</el-button>
              </div>
            </el-dialog>

      </el-tab-pane>

      <el-tab-pane label="充电桩电价" name="second">
          <h2 style="margin-bottom: 20px;">充电桩电价</h2>
          <el-form :inline="true" style="background-color: rgb(251,251,251)" class="chargeForm" label-width="150px" ref="chargeRef">
            <el-form-item label="时长1（小时）" prop="hour1">
              <el-input v-model="chargePrices[0].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格1（元）" prop="price1">
              <el-input v-model="chargePrices[0].price"></el-input>
            </el-form-item>
            <el-form-item label="时长2（小时）" prop="hour2">
              <el-input v-model="chargePrices[1].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格2（元）" prop="price2">
              <el-input v-model="chargePrices[1].price"></el-input>
            </el-form-item>
            <el-form-item label="时长3（小时）" prop="hour3">
              <el-input v-model="chargePrices[2].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格3（元）" prop="price3">
              <el-input v-model="chargePrices[2].price"></el-input>
            </el-form-item>
            <el-form-item label="时长4（小时）" prop="hour4">
              <el-input v-model="chargePrices[3].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格4（元）" prop="price4">
              <el-input v-model="chargePrices[3].price"></el-input>
            </el-form-item>
            <el-form-item label="时长5（小时）" prop="hour5">
              <el-input v-model="chargePrices[4].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格5（元）" prop="price5">
              <el-input v-model="chargePrices[4].price"></el-input>
            </el-form-item>
            <el-form-item label="时长6（小时）" prop="hour6">
              <el-input v-model="chargePrices[5].hour"></el-input>
            </el-form-item>
            <el-form-item label="价格6（元）" prop="price6">
              <el-input v-model="chargePrices[5].price"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns1">
            <el-button type="primary" class="el-icon-plus" @click="addCharge" v-if="btnVisible"> 新增</el-button>
            <template v-else>
              <el-button type="primary" class="el-icon-edit" @click="editCharge"> 编辑</el-button>
              <el-button type="primary" class="el-icon-delete" @click="deleteCharge"> 删除</el-button>
            </template>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>



  </div>
</template>
<script>
export default {
  data () {
    const validateHour = (rule, value, callback) => {
        if (value) {
            return callback()
        } else {
            return callback(new Error('请输入时长'))
        }
    }
    const validatePrice = (rule, value, callback) => {
        if (value) {
            return callback()
        } else {
            return callback(new Error('请输入价格'))
        }
    }
    return {
      active: 'first',
      tableData: [],
      total: 0,
      PageParams: {
        appType: 3,
        pageNum: 1,
        pageSize: 10
      },
      form: {
        pricevalue: '',
        pricename: ''
      },
      dialogFormVisible: false,
      opttype: 1,
      priceid: '',
      departmentid: '',
      chargePrices: [
        {hour: '', price: ''},
        {hour: '', price: ''},
        {hour: '', price: ''},
        {hour: '', price: ''},
        {hour: '', price: ''},
        {hour: '', price: ''},
      ],
      btnVisible: true,
      // formRules: {
      //   hour1: [{ validator: validateHour }],
      //   hour2: [{ validator: validateHour }],
      //   hour3: [{ validator: validateHour }],
      //   hour4: [{ validator: validateHour }],
      //   hour5: [{ validator: validateHour }],
      //   hour6: [{ validator: validateHour }],
      //   price1:[{ validator: validatePrice }],
      //   price2:[{ validator: validatePrice }],
      //   price3:[{ validator: validatePrice }],
      //   price4:[{ validator: validatePrice }],
      //   price5:[{ validator: validatePrice }],
      //   price6:[{ validator: validatePrice }]
      // },
    };
  },
  methods:{
    handleSizeChange(size) {
      this.PageParams.pageSize = size
      this.getElectricityPrice()
    },
    handleCurrentChange(page) {
      this.PageParams.pageNum = page
      this.getElectricityPrice()
    },

    getElectricityPrice() {
      this.$request('electricityPrice', {params: this.PageParams}).then(res => {
        console.log('电表电价数据', res)
        if (res.data.returncode === 1) {
          this.tableData = res.data.items
          this.total = res.data.total
        }
      })
    },
    openDialog(opttype, row) {
      this.opttype = opttype
      if (row) {
        this.priceid = row.priceid
        this.departmentid = row.departmentid
        this.form.pricevalue = row.pricevalue
        this.form.pricename = row.pricename
      }
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.form.pricevalue = ''
      this.form.pricename = ''
      this.dialogFormVisible = false
    },

    addPrice() {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let obj = {
            opttype: 1,
            ...this.form
          }
          this.$refs.chargeRef.validate(valid => {
            if (!valid) return
            this.$request('optWifiPrice', obj).then(res => {
              console.log('新建电价', res)
              if (res.data.returncode === 1) {
                this.dialogFormVisible = false
                this.getElectricityPrice()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              } else {
                this.$message({
                  type: 'error',
                  message: '添加失败'
                })
              }
            })
          })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
      })
    },

    editPrice() {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let obj = {
            opttype: 2,
            priceid: this.priceid,
            departmentid: this.departmentid,
            ...this.form
          }
          this.$request('optWifiPrice', obj).then(res => {
            console.log('修改电价', res)
            if (res.data.returncode === 1) {
              this.dialogFormVisible = false
              this.getElectricityPrice()
              this.form.pricevalue = ''
              this.form.pricename = ''
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '修改失败'
              })
            }
          })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
      })
    },
    
    deletePrice(row) {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {

        let obj = {
          opttype: 3,
          priceid: row.priceid,
          pricename: row.pricename,
          pricevalue: row.pricevalue,
          departmentid: row.departmentid,
        }

        this.$request('optWifiPrice', obj).then(res => {
          console.log('删除电价', res)
          if (res.data.returncode === 1) {
            this.getElectricityPrice()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
          
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
      })

    },
    formatter(row) {
      return row.totalused ? '已使用' : '未使用'
    },

    getCharingPrice() {
      this.$request('electricityPrice', {params: {appType: 1}}).then(res => {
        console.log('充电桩电价数据', res)
        if (res.data.returncode === 1 && res.data.items.length > 0) {
          this.chargePrices = res.data.items
        }
        this.btnVisible = !res.data.items.length
      })
    },

    addCharge() {
        this.$confirm('是否继续操作', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let obj = {
              opttype: 1,
              item: this.chargePrices.map(item => ({hour: item.hour, price: item.price}))
            }
            this.$request('optCharingPrice', obj).then(res => {
              console.log('新增充电桩电价', res)
              if (res.data.returncode === 1) {
                this.$message.success('新增成功')
                this.getCharingPrice()
              } else {
                this.$message.error('新增失败')
              }
            })
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })       
        })
    },
    editCharge() {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let obj = {
            opttype: 2,
            item: this.chargePrices
          }
          this.$request('optCharingPrice', obj).then(res => {
            console.log('修改充电桩电价', res)
            if (res.data.returncode === 1) {
              this.$message.success('修改成功')
              this.getCharingPrice()
            } else {
              this.$message.error('修改失败')
            }
          })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
      })

    },
    deleteCharge() {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let obj = {
            opttype: 3,
            item: this.chargePrices
          }
          this.$request('optCharingPrice', obj).then(res => {
            console.log('删除充电桩电价', res)
            if (res.data.returncode === 1) {
              this.$message.success('删除成功')
              this.chargePrices = this.chargePrices.map(item => ({hour: '', price: ''}))
              this.getCharingPrice()
            } else {
              this.$message.error('删除失败')
            }
          })
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })       
      })
    },
  },
  mounted() {
    this.getElectricityPrice()
    this.getCharingPrice()
  }
}
</script>
<style lang='scss' scoped>
.priceManage {
  background-color: #fff;
  border: 1px solid rgb(238,238,238);
  border-radius: 3px;
  h2 {
    height: 50px;
    padding-left: 20px;
    border-bottom: 1px solid rgb(238,238,238);
    line-height: 50px;
    font-size: 16px;
    box-sizing: border-box;
  }
  .btns {
    padding: 20px;
    button {
      width: 100px;
      height: 32px;
      padding-left: 20px;
      text-align: left;
      border: 1px solid rgb(221,224,231);
      background-color: #fff;
      border-radius: 3px;
      box-sizing: border-box;
      cursor: pointer;
      outline: none;
    }
  }

  .table {
    padding: 0 20px 20px;
    .el-button {
      font-size: 18px;
    }
    .page {
        height: 80px;
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
            .el-input__inner {
              width: 100px;
            }
          }
        }
      }
  }
}

.el-tabs {
  /deep/ .el-tabs__header {
    border: 0;
    padding: 20px;
    .el-tabs__nav {
      border-radius: 3px;
      border: 1px solid rgb(221,224,231);
      .el-tabs__item {
        color: rgb(96,98,102);
        border: none;
      }
      .el-tabs__item.is-active {
        color: #fff;
        background-color: rgb(45,134,225);
      }
    }
  }
}

.chargeForm {
  /deep/ .el-input {
    width: 160px;
  }
}
.btns1 {
  float: right;
  padding: 10px;
}

.used {
  color: rgb(103,194,58);
}
.unused {
  color: rgb(245,108,108);
}
</style>