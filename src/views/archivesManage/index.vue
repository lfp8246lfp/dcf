<template>
  <div id="archivesManage">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="单位管理" name="first">
        <div id="manageUnit">
          <h2>单位列表</h2>
            <div class="operate">
              <div class="btns">
                <button class="el-icon-plus" @click="openDialog(1)"> 新增</button>
                <button class="el-icon-upload2"> 导出</button>
              </div>
              <div class="filter">
                <el-input placeholder="搜索房间" v-model="listParams.search"></el-input>
                <el-button type="primary" class="el-icon-search" size="mini" @click="getList"></el-button>
              </div>
            </div>
            <div class="table">
                <el-table
                  :data="tableData"
                  border
                  stripe 
                  style="width: 100%"
                  :header-cell-style="{background:'rgb(250,250,250)'}">
                  <el-table-column
                    prop="roomname"
                    label="房间名称">
                  </el-table-column>
                  <el-table-column
                    prop="accountid"
                    label="住户名">
                  </el-table-column>
                  <el-table-column
                    label="所属区域">
                    <template slot-scope="scope">
                      {{scope.row.province + scope.row.town + scope.row.region}}
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="disc"
                    label="详细地址">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                      <el-button size="mini" class="el-icon-edit" @click="openDialog(2,scope.row)"></el-button>
                      <el-button size="mini" class="el-icon-delete-solid" @click="deleteRoom(scope.row)"></el-button>
                      <el-button size="mini" class="el-icon-s-operation" @click="openRoomDevices(scope.row.id)"></el-button>
                      <el-button size="mini" class="el-icon-s-tools"></el-button>
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
            <el-dialog :title="(optype === 1 ? '新增' : '修改') + '房间'" :visible.sync="dialogFormVisible1" width="40%">
              <el-form :model="form" label-width="28%">
                <el-form-item label="房间名称">
                  <el-input v-model="form.roomname"></el-input>
                </el-form-item>
                <el-form-item label="住户名">
                  <el-input v-model="form.accountid"></el-input>
                </el-form-item>
                <el-form-item label="选择地址">
                      <div class="address">
                        <el-select v-model="form.province" placeholder="省" @change="chooseP" size="mini">
                          <el-option
                            v-for="item in provinces"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-select v-model="form.town" placeholder="市" @change="chooseC">
                          <el-option
                            v-for="item in cities"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        <el-select v-model="form.region" placeholder="区" @change="chooseA">
                          <el-option
                            v-for="item in areas"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                </el-form-item>
                <el-form-item label="详细地址">
                  <el-input v-model="form.disc"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="editRoom">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="房间设备" :visible.sync="dialogFormVisible2" width="80%">
              <el-tabs v-model="active1" type="card">
                <el-tab-pane label="电表" name="meter">
                    <div class="operate">
                      <div class="btns">
                        <button class="el-icon-plus" @click="openDialog2(0)"> 新增</button>
                        <button class="el-icon-upload2"> 导出</button>
                      </div>
                    </div>
                    <div class="table">
                      <el-table :data="roomDevData" border stripe style="width: 100%" :header-cell-style="{background:'rgb(250,250,250)'}">
                        <el-table-column label="电表id" prop="rtuid"></el-table-column>
                        <el-table-column label="电表名称" prop="disc"></el-table-column>
                        <el-table-column label="wifi表通讯地址" prop="commaddress"></el-table-column>
                        <el-table-column label="电价值" prop="priceValue"></el-table-column>
                        <el-table-column label="电价id" prop="priceid"></el-table-column>
                        <el-table-column label="剩余电量" prop="balanceValue"></el-table-column>
                        <el-table-column label="电表示数" prop="zybm"></el-table-column>
                        <el-table-column label="操作" width="200">
                          <template slot-scope="scope">
                            <el-button size="mini" class="el-icon-edit" @click="openDialog2(1, scope.row)"></el-button>
                            <el-button size="mini" class="el-icon-delete-solid" @click="deleteMeter(scope.row.rtuid)"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="page">
                        <el-pagination
                          @size-change="handleSizeChange1"
                          @current-change="handleCurrentChange1"
                          :page-sizes="[10, 20, 30]"
                          :page-size="10"
                          layout="prev, pager, next, sizes"
                          :total="total1">
                        </el-pagination>
                      </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="水表" name="waterMeter"></el-tab-pane>
              </el-tabs>
            </el-dialog>
            <el-dialog title="配置预付费" :visible.sync="dialogFormVisible3" width="40%">
              <el-form :model="form2" label-width="28%" ref="editDevRef" :rules="editDevRules">
                <el-form-item label="电表名称">
                  <el-input v-model="form2.metername"></el-input>
                </el-form-item>
                <el-form-item label="表号" prop="commaddress">
                  <el-input v-model="form2.commaddress"></el-input>
                </el-form-item>
                <el-form-item label="阈值">
                  <el-input v-model="form2.alarmenergy" disabled></el-input>
                </el-form-item>
                <el-form-item label="电价（元/度）">
                  <el-select v-model="form2.priceid">
                    <el-option
                      v-for="item in prices"
                      :key="item.priceid"
                      :label="item.pricevalue"
                      :value="item.priceid">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="editMeter">确 定</el-button>
              </div>
            </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="充电桩设备" name="second">
        <div id="chargeDevice">
          <h2>充电桩设备</h2>
          <div class="operate">
          <div class="btns">
            <button class="el-icon-plus" @click="openDialog3(1)"> 新增</button>
            <button class="el-icon-upload2"> 导出</button>
          </div>
          </div>
          <div class="table">
            <el-table
              :data="tableData1"
              border
              stripe 
              style="width: 100%"
              :header-cell-style="{background:'rgb(250,250,250)'}">
              <el-table-column
                prop="disc"
                label="充电桩名称">
              </el-table-column>
              <el-table-column
                prop="commaddress"
                label="通讯地址">
              </el-table-column>
              <el-table-column
                prop="version"
                label="充电桩编号">
              </el-table-column>
              <el-table-column
                prop="plugnum"
                label="插座数量">
              </el-table-column>
              <el-table-column
                prop="longitude"
                label="经度">
              </el-table-column>
              <el-table-column
                prop="dimension"
                label="纬度">
              </el-table-column>
              <el-table-column
                prop="installer"
                label="安装位置">
              </el-table-column>
              <el-table-column
                label="操作"
                width="200">
                <template slot-scope="scope">
                  <el-button size="mini" class="el-icon-edit" @click="openDialog3(2, scope.row)"></el-button>
                  <el-button size="mini" class="el-icon-delete-solid" @click="deleteCharge(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :page-sizes="[10, 20, 30]"
                :page-size="10"
                layout="prev, pager, next, sizes"
                :total="total2">
              </el-pagination>
            </div>
          </div>

          <el-dialog :title="optType === 1 ? '新增充电桩' : '修改充电桩'" :visible.sync="dialogFormVisible" width="40%" @closed="closeDialog">
          <el-form :model="editChargeForm" label-width="28%">
            <el-form-item label="通讯地址">
              <el-input v-model="editChargeForm.commaddress"></el-input>
            </el-form-item>
            <el-form-item label="充电桩名称">
              <el-input v-model="editChargeForm.disc"></el-input>
            </el-form-item>
            <el-form-item label="充电桩编号">
              <el-input v-model="editChargeForm.version"></el-input>
            </el-form-item>
            <el-form-item label="安装位置">
              <el-input v-model="editChargeForm.installer"></el-input>
            </el-form-item>
            <el-form-item label="经度">
              <el-input v-model="editChargeForm.longitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度">
              <el-input v-model="editChargeForm.dimension"></el-input>
            </el-form-item>
            <el-form-item label="插座数量" v-if="optType === 1">
              <el-input v-model="chargingnum"></el-input>
              <el-button @click="chargingnum = 10">10</el-button>
              <el-button @click="chargingnum = 20">20</el-button>
            </el-form-item>
            <!-- <el-form-item label="电站类型">
              <el-select v-model="form.apptype">
                <el-option
                v-for="item in appTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editCharge(optType)">确 定</el-button>
          </div>
          </el-dialog>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    const validateCommaddress = (rule, value, callback) => {
        if (/^\d{8}$/.test(value)) {
            return callback()
        } else {
            return callback(new Error('请输入8位数字'))
        }
    }

    return {
      active: 'first',
      tableData: [],
      total: 0,
      total1: 0,
      listParams: {
        search: '',
        pageNum: 1,
        pageSize: 10
      },
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      form: {
        roomname: '',
        phone: '',
        disc: '',
        accountid: '',
        province: '',
        town: '',
        region: '',
      },
      provinces: [],
      cities: [],
      areas: [],
      mapJson:'../static/json/map.json',
      optype: 1,
      id: '',
      departmentid: '',
      active1: 'meter',
      roomPageParams: {
        pageNum: 1,
        pageSize: 10
      },
      form2: {
        commaddress: '',
        metername: '',
        alarmenergy: 20,
        priceid: 93,
      },
      editDevRules: {
        commaddress: [{ validator: validateCommaddress }]
      },
      roomDevData: [],
      meter: 0,
      devType: 1,
      devTypes: [{label: 'WIFI电表', value: 1}, {label: 'WIFI水表', value: 2}],
      prices: [],
        // 电价数据


      tableData1: [],
      chargePageParams: {
        pageNum: 1,
        pageSize: 10
      },
      total2: 0,
      dialogFormVisible: false,
      editChargeForm: {
        commaddress: '',
        disc: '',
        version: '',
        installer: '',
        dimension: '',
        longitude: ''
      },
      optType: 1,
      chargingnum: '',
      commaddress: ''
    };
  },

  methods:{
    getList() {
      this.$request('getUnitList', {params: this.listParams}).then(res => {
        console.log('单位列表数据', res)
        if (res.code === 200) {
          this.tableData = res.data.items
          this.total = res.data.total
        }
      })
    },

    handleSizeChange(size) {
      this.listParams.pageSize = size
      this.getList()
    },
    handleCurrentChange(page) {
      this.listParams.pageNum = page
      this.getList()
    },
    handleSizeChange1(size) {
      this.roomPageParams.pageSize = size
      this.openRoomDevices(this.id)
    },
    handleCurrentChange1(page) {
      this.roomPageParams.pageNum = page
      this.openRoomDevices(this.id)
    },

    getMapData() {
      axios(this.mapJson).then(res => {
        this.provinces = res.data
      })
    },
    chooseP(value) {
      this.cities = this.provinces.find(item => item.value === value).children
      this.areas = []
      this.form.town = ''
      this.form.region = ''
    },
    chooseC(value) {
      this.areas = this.cities.find(item => item.value === value).children
      this.form.region = ''
    },
    chooseA() {},

    openDialog(optype, row) {
        this.getMapData()
        if (optype === 1) {
          this.optype = 1
          this.form.roomname = ''
          this.form.accountid = ''
          this.form.disc = ''
          this.form.province = ''
          this.form.town = ''
          this.form.region = ''
          this.id = ''
          this.departmentid = ''
        } else {
          this.optype = 2
          this.form.roomname = row.roomname
          this.form.accountid = row.accountid
          this.form.disc = row.disc
          this.form.province = row.province
          this.form.town = row.town
          this.form.region = row.region
          this.id = row.id
          this.departmentid = row.departmentid
        }
        this.dialogFormVisible1 = true
    },

    editRoom() {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.optype === 1) {
            var params = {
              optype: 1,
              ...this.form
            }
          } else {
            var params = {
              optype: 2,
              id: this.id,
              accountid: this.accountid,
              ...this.form
            }
          }
          this.$request('optUnit', params).then(res => {
            console.log('新增修改房间', res)
            if (res.data.returnCode === 1) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.dialogFormVisible1 = false
              this.getList()
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

    deleteRoom(row) {
        let deleteParams = {
          id: row.id,
          roomname: row.roomname,
          phone: row.accountid,
          province: row.province,
          region: row.region,
          town: row.town,
          disc: row.disc,
          optype: 3
        }

        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$request('optUnit', deleteParams).then(res => {
            console.log('删除房间', res)
            if (res.data.returnCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getList()
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
            message: '已取消删除'
          })
        })
    },

    openRoomDevices(id) {
      let params = {
        roomid: id,
        appType: 3,
        ...this.roomPageParams
      }
      this.id = id
      this.$request('getRoomRtuList',{params}).then(res => {
        console.log('房间设备数据', res.data)
        this.roomDevData = res.data.items
        this.total1 = res.data.total
      })
      this.dialogFormVisible2 = true
    },

    openDialog2(n, row) {
      this.meter = n
      this.$request('getSinglePriceList').then(res => {
        console.log('电价', res)
        if (res.data.returncode === 1) {
          this.prices = res.data.items
        }
      })
      if (n) {
        this.form2.metername = row.disc
        this.form2.commaddress = row.commaddress
        this.form2.priceid = row.priceid
      } else {
        this.form2.metername = ''
        this.form2.commaddress = ''
        this.form2.priceid = 93
      }
      this.dialogFormVisible3 = true
    },

    editMeter() {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.editDevRef.validate(valid => {

            if (!valid) return

            this.$request('addDevInfo', {id: this.id, ...this.form2}).then(res => {
              console.log('新增修改设备', res)
              if (res.data.returncode === 1) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.dialogFormVisible3 = false
                this.openRoomDevices(this.id)
                  //参数是房间id
              } else {
                this.$message({
                  type: 'error',
                  message: '操作失败'
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

    deleteMeter(rtuid) {
      console.log(rtuid)
      this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request('deleteDevInfo', {rtuid}).then(res => {
            console.log('删除设备', res)
            if (res.data.returncode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.dialogFormVisible3 = false
              this.openRoomDevices(this.id)
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
            message: '已取消删除'
          })
        })
    },


    getChargeData() {
      this.$request('queryCharging', {commaddress: '', ...this.chargePageParams}).then(res => {
        console.log('充电桩数据', res)
        if (res.data.returncode === 1) {
          this.tableData1 = res.data.items
          this.total2 = res.data.total
        }
      })
    },
    openDialog3(optType, row) {
      if (optType === 2) {
        this.optType = optType
        this.editChargeForm.commaddress = row.commaddress
        this.editChargeForm.disc = row.disc
        this.editChargeForm.version = row.version
        this.editChargeForm.installer = row.installer
        this.editChargeForm.dimension = row.dimension
        this.editChargeForm.longitude = row.longitude
        this.chargingnum = row.plugnum
        this.commaddress = row.commaddress
        this.rtuid = row.rtuid
      }
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.editChargeForm.commaddress = ''
      this.editChargeForm.disc = ''
      this.editChargeForm.version = ''
      this.editChargeForm.installer = ''
      this.editChargeForm.longitude = ''
      this.editChargeForm.dimension = ''
      this.chargingnum = ''
      this.commaddress = ''
      this.rtuid = ''
    },
    editCharge(optType) {
      let ischangeaddress
      if (optType === 1) {
        ischangeaddress = '0'
      } else if (this.editChargeForm.commaddress.trim() === this.commaddress.trim()) {
        ischangeaddress = '0'
      } else {
        ischangeaddress = '1'
      }
      let obj = {
        optType,
        chargingnum: this.chargingnum,
        obj: {
          ischangeaddress,
          apptype: '1',
          rtuid: this.rtuid,
          ...this.editChargeForm
        }
      }
      this.$request('optRtuInfo', {...obj}).then(res => {
        console.log('新增修改充电桩', res)
        if (res.data.returnResult === 1) {
          this.dialogFormVisible = false
          this.getChargeData()
          this.$message.success('操作成功')
        } else {
          this.$message.error('操作失败')
        }
      })
    },
    deleteCharge(row) {
      this.$request('optRtuInfo', {optType: 3, obj: row}).then(res => {
        console.log('删除充电桩', res)
        if (res.data.returnResult === 1) {
          this.getChargeData()
          this.$message.success('删除成功')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    handleSizeChange2(size) {
      this.chargePageParams.pageSize = size
      this.getChargeData()
    },
    handleCurrentChange2(page) {
      this.chargePageParams.pageNum = page
      this.getChargeData()
    },
    handleClick(e) {
      if (e.name === 'first') {
        this.getList()
      } else {
        this.getChargeData()
      }
    }
  },
  mounted() {
    this.getList()
    this.getChargeData()
  }
}
</script>
<style lang='scss' scoped>
#archivesManage {
  padding-top: 20px;
  background-color: #fff;
  border: 1px solid rgb(238,238,238);
  border-radius: 3px;
  #manageUnit {
    background-color: #fff;
    // border: 1px solid rgb(238,238,238);
    // border-radius: 3px;
    h2 {
      height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid rgb(238,238,238);
      line-height: 50px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .operate {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .btns {
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
      .filter {
        display: flex;
        .el-input {
          /deep/ .el-input__inner {
            height: 32px;
            width: 144px;
            border-radius: 4px 0 0 4px;
          }
        }
        .el-button {
          border-radius: 0 3px 3px 0;
        }
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
    .address {
      display: flex;
      .el-select {
        margin-right: 10px;
        /deep/ .el-input__inner {
          width: 1.875rem;
          font-size: 14px;
        }
      }
    }
  }


  #chargeDevice {
    background-color: #fff;
    // border: 1px solid rgb(238,238,238);
    // border-radius: 3px;
    h2 {
      height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid rgb(238,238,238);
      line-height: 50px;
      font-size: 16px;
      box-sizing: border-box;
    }
    .operate {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .btns {
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
      .filter {
        display: flex;
        .el-input {
          /deep/ .el-input__inner {
            height: 32px;
            width: 144px;
            border-radius: 4px 0 0 4px;
          }
        }
        .el-button {
          border-radius: 0 3px 3px 0;
        }
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
    .address {
      display: flex;
      .el-select {
        margin-right: 10px;
        /deep/ .el-input__inner {
          width: 1.875rem;
          font-size: 14px;
        }
      }
    }
  }

  .el-tabs {
    /deep/ .el-tabs__header {
      margin: 0;
      border: 0;
      display: flex;
      justify-content: center;
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
}
</style>