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
                      <el-button size="mini" class="el-icon-edit" @click="openDialog(2, scope.row)" :disabled="!!scope.row.totalused"></el-button>
                      <el-button size="mini" class="el-icon-delete-solid" @click="deletePrice(scope.row)" :disabled="!!scope.row.totalused"></el-button>
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
                <el-button type="primary" @click="editPrice(opttype)">确 定</el-button>
              </div>
            </el-dialog>

      </el-tab-pane>

      <el-tab-pane label="充电桩电价" name="second">
          <h2 style="margin-bottom: 20px;">充电桩电价</h2>
          <el-form :inline="true" :model="form2" style="background-color: rgb(251,251,251)" class="chargeForm" label-width="150px">
            <el-form-item label="时长1（小时）">
              <el-input v-model="form2.duration1"></el-input>
            </el-form-item>
            <el-form-item label="价格1（元）">
              <el-input v-model="form2.price1"></el-input>
            </el-form-item>
            <el-form-item label="时长2（小时）">
              <el-input v-model="form2.duration2"></el-input>
            </el-form-item>
            <el-form-item label="价格2（元）">
              <el-input v-model="form2.price2"></el-input>
            </el-form-item>
            <el-form-item label="时长3（小时）">
              <el-input v-model="form2.duration3"></el-input>
            </el-form-item>
            <el-form-item label="价格3（元）">
              <el-input v-model="form2.price3"></el-input>
            </el-form-item>
            <el-form-item label="时长4（小时）">
              <el-input v-model="form2.duration4"></el-input>
            </el-form-item>
            <el-form-item label="价格4（元）">
              <el-input v-model="form2.price4"></el-input>
            </el-form-item>
            <el-form-item label="时长5（小时）">
              <el-input v-model="form2.duration5"></el-input>
            </el-form-item>
            <el-form-item label="价格5（元）">
              <el-input v-model="form2.price5"></el-input>
            </el-form-item>
            <el-form-item label="时长6（小时）">
              <el-input v-model="form2.duration6"></el-input>
            </el-form-item>
            <el-form-item label="价格6（元）">
              <el-input v-model="form2.price6"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns1">
            <el-button type="primary" class="el-icon-plus"> 新增</el-button>
            <el-button type="primary" class="el-icon-edit"> 编辑</el-button>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>



  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 'first',
      tableData: [],
      total: 0,
      pricePageParams: {
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
      form2: {
        durations1: '',
        durations2: '',
        durations3: '',
        durations4: '',
        durations5: '',
        durations6: '',
        price1: '',
        price2: '',
        price3: '',
        price4: '',
        price5: '',
        price6: '',
      }
    };
  },
  methods:{
    handleSizeChange(size) {
      this.pricePageParams.pageSize = size
      this.getElectricityPrice()
    },
    handleCurrentChange(page) {
      this.pricePageParams.pageNum = page
      this.getElectricityPrice()
    },

    getElectricityPrice() {
      this.$request('electricityPrice', {params: {appType: 3, ...this.pricePageParams}}).then(res => {
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
    editPrice(opttype) {
      this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let obj = {
            opttype,
            ...this.form
          }

          if (opttype === 2) {
            obj.priceid = this.priceid
            obj.departmentid = this.departmentid
          }

          this.$request('optWifiPrice', obj).then(res => {
            console.log('新建修改电价', res)
            if (res.data.returncode === 1) {
              this.dialogFormVisible = false
              this.getElectricityPrice()
              this.form.pricevalue = ''
              this.form.pricename = ''
              this.$message({
                type: 'success',
                message: '操作成功'
              })
            } else {
              this.$message({
                type: 'error',
                message: '操作失败'
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
      })
    }
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