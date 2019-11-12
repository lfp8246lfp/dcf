<template>
  <div id="archivesManage">
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="单位管理" name="first">
        <div id="manageUnit">
          <h2>单位列表</h2>
            <div class="operate">
              <div class="btns">
                <button class="el-icon-plus" @click="openAddRoomDialog"> 新增</button>
                <!-- <button class="el-icon-upload2"> 导出</button> -->
              </div>
              <div class="filter">
                <el-input placeholder="搜索房间" v-model="listParams.roomName"></el-input>
                <el-button type="primary" class="el-icon-search" size="mini" @click="getRoomList"></el-button>
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
                    type="index"
                    label="序号"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="roomname"
                    label="房间名称">
                  </el-table-column>
                  <el-table-column
                    prop="accountid"
                    label="住户名">
                  </el-table-column>
                  <el-table-column
                    label="所属区域"
                    :formatter="mapFormat">
                  </el-table-column>
                  <el-table-column
                    prop="disc"
                    label="详细地址">
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="300">
                    <template slot-scope="scope">
                      <el-tooltip effect="dark" content="编辑房间" placement="top-start">
                        <el-button size="mini" class="el-icon-edit" @click="openEditRoomDialog(scope.row)"></el-button>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="删除房间" placement="top-start">
                        <el-button size="mini" class="el-icon-delete-solid" @click="deleteRoom(scope.row)"></el-button>
                      </el-tooltip>
                      <el-tooltip effect="dark" content="查看房间设备" placement="top-start">
                        <el-button size="mini" class="el-icon-s-operation" @click="openRoomDevices(scope.row.id)"></el-button>
                      </el-tooltip>
                      <!-- <el-button size="mini" class="el-icon-s-tools"></el-button> -->
                    </template>
                  </el-table-column>
                </el-table>
                <div class="page">
                  <el-pagination
                    @size-change="roomHandleSizeChange"
                    @current-change="roomHandleCurrentChange"
                    :page-sizes="[10, 20, 30]"
                    :page-size="10"
                    layout="prev, pager, next, sizes"
                    :total="roomTotal">
                  </el-pagination>
                </div>
            </div>
            <el-dialog :title="(optype === 1 ? '新增' : '修改') + '房间'" :visible.sync="roomDialogVisible" width="40%" @closed="closeRoomDialog">
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
                <el-button @click="roomDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="optype === 1 ? addRoom() : editRoom()">确 定</el-button>
              </div>
            </el-dialog>

            <el-dialog title="房间设备" :visible.sync="devDialogVisible" width="80%">
              <!-- <el-tabs v-model="active1" type="card">
                <el-tab-pane label="电表" name="meter"> -->
                    <div class="operate">
                      <div class="btns">
                        <button class="el-icon-plus" @click="openAddDevDialog(0)"> 新增</button>
                        <!-- <button class="el-icon-upload2"> 导出</button> -->
                      </div>
                    </div>
                    <div class="table">
                      <el-table :data="roomDevData" border stripe style="width: 100%" :header-cell-style="{background:'rgb(250,250,250)'}">
                        <el-table-column type="index" label="序号" width="60"></el-table-column>
                        <!-- <el-table-column label="电表id" prop="rtuid"></el-table-column> -->
                        <el-table-column label="电表名称" prop="disc"></el-table-column>
                        <el-table-column label="WIFI表通讯地址" prop="commaddress"></el-table-column>
                        <el-table-column label="电价值" :formatter="formatter"></el-table-column>
                        <!-- <el-table-column label="电价id" prop="priceid"></el-table-column> -->
                        <el-table-column label="剩余电量" prop="balanceValue"></el-table-column>
                        <el-table-column label="电表示数" prop="zybm"></el-table-column>
                        <el-table-column label="操作" width="200">
                          <template slot-scope="scope">
                            <el-button size="mini" class="el-icon-edit" @click="openEditDevDialog(scope.row)"></el-button>
                            <el-button size="mini" class="el-icon-delete-solid" @click="deleteMeter(scope.row.rtuid)"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="page">
                        <el-pagination
                          @size-change="devHandleSizeChange"
                          @current-change="devHandleCurrentChange"
                          :page-sizes="[10, 20, 30]"
                          :page-size="10"
                          layout="prev, pager, next, sizes"
                          :total="devTotal">
                        </el-pagination>
                      </div>
                    </div>
                <!-- </el-tab-pane> -->
                <!-- <el-tab-pane label="水表" name="waterMeter"></el-tab-pane> -->
              <!-- </el-tabs> -->
            </el-dialog>

            <el-dialog title="配置预付费" :visible.sync="meterDialogVisible" width="40%" @closed="closeAddDevDialog">
              <el-form :model="devForm" label-width="28%" ref="editDevRef" :rules="editDevRules">
                <el-form-item label="电表名称">
                  <el-input v-model="devForm.metername"></el-input>
                </el-form-item>
                <el-form-item label="表号" prop="commaddress">
                  <el-input v-model="devForm.commaddress"></el-input>
                </el-form-item>
                <el-form-item label="阈值">
                  <el-input v-model="devForm.alarmenergy" disabled></el-input>
                </el-form-item>
                <el-form-item label="电价（元/度）">
                  <el-select v-model="devForm.priceid">
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
                <el-button @click="meterDialogVisible = false">取 消</el-button>
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
            <button class="el-icon-plus" @click="openAddChargeDialog"> 新增</button>
            <!-- <button class="el-icon-upload2"> 导出</button> -->
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
                type="index" 
                label="序号" 
                width="60">
              </el-table-column>
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
                  <el-button size="mini" class="el-icon-edit" @click="openEditChargeDialog(scope.row)"></el-button>
                  <el-button size="mini" class="el-icon-delete-solid" @click="deleteCharge(scope.row)" v-if="!scope.plugUseTotal"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                @size-change="chargeHandleSizeChange"
                @current-change="chargeHandleCurrentChange"
                :page-sizes="[10, 20, 30]"
                :page-size="10"
                layout="prev, pager, next, sizes"
                :total="chargeTotal">
              </el-pagination>
            </div>
          </div>

          <el-dialog :title="optType === 1 ? '新增充电桩' : '修改充电桩'" :visible.sync="chargeDialogVisible" width="40%" @closed="closeChargeDialog">
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
            <el-button @click="chargeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="optType === 1 ? addCharge() : editCharge()">确 定</el-button>
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
      roomTotal: 0,
      devTotal: 0,
      // 获取房间数据的参数
      listParams: {
        roomName: '',
        pageNum: 1,
        pageSize: 10
      },
      // 新增/修改房间对话框的显示
      roomDialogVisible: false,
      // 查看房间设备对话框的显示
      devDialogVisible: false,
      // 新增/修改房间设备对话框的显示
      meterDialogVisible: false,
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
      // 获取房间设备数据的分页参数
      devPageParams: {
        pageNum: 1,
        pageSize: 10
      },

      // 配置预付费的表单数据
      devForm: {
        commaddress: '',
        metername: '',
        alarmenergy: 20,
        priceid: '',
      },
      editDevRules: {
        commaddress: [{ validator: validateCommaddress }]
      },
      roomDevData: [],
      meter: 0,
      devType: 1,
      devTypes: [{label: 'WIFI电表', value: 1}, {label: 'WIFI水表', value: 2}],
      // 电价数据
      prices: [],
        


      tableData1: [],
      chargePageParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 充电桩数量
      chargeTotal: 0,
      // 新增/修改充电桩对话框的显示
      chargeDialogVisible: false,
      // 新增/修改充电桩的表单数据
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
    // 获取房间列表
    getRoomList() {
      this.$request('getUnitList', {params: this.listParams}).then(res => {
        console.log('单位列表数据', res)
        if (res.code === 200) {
          this.tableData = res.data.items
          this.roomTotal = res.data.total
        }
      })
    },

    // 房间分页
    roomHandleSizeChange(size) {
      this.listParams.pageSize = size
      this.getRoomList()
    },
    roomHandleCurrentChange(page) {
      this.listParams.pageNum = page
      this.getRoomList()
    },

    // 房间设备分页
    devHandleSizeChange(size) {
      this.devPageParams.pageSize = size
      this.openRoomDevices(this.id)
    },
    devHandleCurrentChange(page) {
      this.devPageParams.pageNum = page
      this.openRoomDevices(this.id)
    },

    // 获取省市区数据
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

    // 关闭 新增修改房间的对话框
    closeRoomDialog() {
        this.form.roomname = ''
        this.form.accountid = ''
        this.form.disc = ''
        this.form.province = ''
        this.form.town = ''
        this.form.region = ''
    },

    // 打开新增房间的对话框
    openAddRoomDialog() {
        // 获取省市区数据
        this.getMapData()
        this.optype = 1
        this.roomDialogVisible = true
    },

    // 打开修改房间的对话框
    openEditRoomDialog(row) {
        this.getMapData()
        this.optype = 2
        this.form.roomname = row.roomname
        this.form.accountid = row.accountid
        this.form.disc = row.disc
        this.form.province = row.province
        this.form.town = row.town
        this.form.region = row.region
        this.id = row.id
        this.departmentid = row.departmentid
        this.roomDialogVisible = true
    },

    // openDialog(optype, row) {
    //     this.getMapData()
    //     if (optype === 1) {
    //       this.optype = 1
    //       this.form.roomname = ''
    //       this.form.accountid = ''
    //       this.form.disc = ''
    //       this.form.province = ''
    //       this.form.town = ''
    //       this.form.region = ''
    //       this.id = ''
    //       this.departmentid = ''
    //     } else {
    //       this.optype = 2
    //       this.form.roomname = row.roomname
    //       this.form.accountid = row.accountid
    //       this.form.disc = row.disc
    //       this.form.province = row.province
    //       this.form.town = row.town
    //       this.form.region = row.region
    //       this.id = row.id
    //       this.departmentid = row.departmentid
    //     }
    //     this.roomDialogVisible = true
    // },

    // 新增房间
    addRoom() {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {
            optype: 1,
            ...this.form
          }
          this.$request('optUnit', obj).then(res => {
            console.log('新增房间', res)
            if (res.data.returnCode === 1) {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
              this.roomDialogVisible = false
              this.getRoomList()
            } else {
              this.$message({
                type: 'error',
                message: '新增失败'
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

    // 编辑房间
    editRoom() {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {
            optype: 2,
            id: this.id,
            accountid: this.accountid,
            ...this.form
          }
          this.$request('optUnit', obj).then(res => {
            console.log('修改房间', res)
            if (res.data.returnCode === 1) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              this.roomDialogVisible = false
              this.getRoomList()
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

    // 删除房间
    deleteRoom(row) {
        let obj = {
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
          
          this.$request('optUnit', obj).then(res => {
            console.log('删除房间', res)
            if (res.data.returnCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getRoomList()
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

    // 获取房间设备数据
    openRoomDevices(id) {
      let params = {
        roomid: id,
        appType: 3,
        ...this.devPageParams
      }
      this.id = id
      this.$request('getRoomRtuList',{params}).then(res => {
        console.log('房间设备数据', res.data)
        this.roomDevData = res.data.items
        this.devTotal = res.data.total
      })
      this.devDialogVisible = true
    },


    // 关闭新增修改设备的对话框
    closeAddDevDialog() {
      this.devForm.metername = ''
      this.devForm.commaddress = ''
    },

    // 打开新增设备的对话框
    openAddDevDialog() {
      this.$request('getSinglePriceList').then(res => {
        console.log('电价', res)
        if (res.data.returncode === 1) {
          this.prices = res.data.items
        }
        this.devForm.priceid = res.data.items[0].priceid
      })
      this.meterDialogVisible = true
    },
    // 打开修改设备的对话框
    openEditDevDialog(row) {
      this.$request('getSinglePriceList').then(res => {
        console.log('电价', res)
        if (res.data.returncode === 1) {
          this.prices = res.data.items
        }
        this.devForm.metername = row.disc
        this.devForm.commaddress = row.commaddress
        // this.devForm.priceid = row.priceid
        let price = this.prices.find(item => item.priceid === row.priceid)
        this.devForm.priceid = price ? price.priceid : ''
      })
      this.meterDialogVisible = true
    },
    

    // openDialog2(n, row) {
    //   this.meter = n
    //   this.$request('getSinglePriceList').then(res => {
    //     console.log('电价', res)
    //     if (res.data.returncode === 1) {
    //       this.prices = res.data.items
    //     }
    //     if (n) {
    //       this.devForm.metername = row.disc
    //       this.devForm.commaddress = row.commaddress
    //       this.devForm.priceid = row.priceid
    //     } else {
    //       this.devForm.metername = ''
    //       this.devForm.commaddress = ''
    //       this.devForm.priceid = res.data.items[0].priceid
    //     }
    //   })
    //   this.meterDialogVisible = true
    // },

    // 新增/编辑电表
    editMeter() {
        this.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.editDevRef.validate(valid => {

            if (!valid) return

            this.$request('addDevInfo', {id: this.id, ...this.devForm}).then(res => {
              console.log('新增修改设备', res)
              if (res.data.returncode === 1) {
                this.$message({
                  type: 'success',
                  message: '操作成功'
                })
                this.meterDialogVisible = false
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
    // 删除电表
    deleteMeter(rtuid) {
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

    // 获取充电桩数据
    getChargeData() {
      this.$request('queryCharging', {commaddress: '', ...this.chargePageParams}).then(res => {
        console.log('充电桩数据', res)
        if (res.data.returncode === 1) {
          this.tableData1 = res.data.items
          this.chargeTotal = res.data.total
        }
      })
    },

    // 打开新增充电桩的对话框
    openAddChargeDialog() {
      this.optType = 1
      this.chargeDialogVisible = true
    },
    // 打开修改充电桩的对话框
    openEditChargeDialog(row) {
        this.optType = 2
        this.editChargeForm.commaddress = row.commaddress
        this.editChargeForm.disc = row.disc
        this.editChargeForm.version = row.version
        this.editChargeForm.installer = row.installer
        this.editChargeForm.dimension = row.dimension
        this.editChargeForm.longitude = row.longitude
        this.chargingnum = row.plugnum
        this.commaddress = row.commaddress
        this.rtuid = row.rtuid
        this.chargeDialogVisible = true
    },

    // 关闭充电桩对话框
    closeChargeDialog() {
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

    addCharge() {
      let obj = {
        optType: 1,
        chargingnum: this.chargingnum,
        obj: {
          ischangeaddress: '0',
          apptype: '1',
          ...this.editChargeForm
        }
      }
      this.$request('optRtuInfo', {...obj}).then(res => {
        console.log('新增修改充电桩', res)
        if (res.data.returnResult === 1) {
          this.chargeDialogVisible = false
          this.getChargeData()
          this.$message.success('添加成功')
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    editCharge() {
      let ischangeaddress
      if (this.editChargeForm.commaddress.trim() === this.commaddress.trim()) {
        ischangeaddress = '0'
      } else {
        ischangeaddress = '1'
      }
      let obj = {
        optType: 2,
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
          this.$message.success('修改成功')
          this.chargeDialogVisible = false
          this.getChargeData()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    deleteCharge(row) {
      this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          this.$request('optRtuInfo', {optType: 3, obj: row}).then(res => {
            console.log('删除充电桩', res)
            if (res.data.returnResult === 1) {
              this.getChargeData()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    chargeHandleSizeChange(size) {
      this.chargePageParams.pageSize = size
      this.getChargeData()
    },
    chargeHandleCurrentChange(page) {
      this.chargePageParams.pageNum = page
      this.getChargeData()
    },
    handleClick(e) {
      if (e.name === 'first') {
        this.getRoomList()
      } else {
        this.getChargeData()
      }
    },
    formatter(row) {
      if (row.priceValue) {
        return row.priceValue + ' 元/kwh'
      }
    },
    mapFormat(row) {
      return (row.province ? row.province : '') + (row.town ? row.town : '') + (row.region ? row.region : '')
    }
  },
  mounted() {
    this.getRoomList()
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