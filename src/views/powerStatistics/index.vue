<template>
  <div id="powerStatistics">
    <el-tabs v-model="active" type="card">
      <el-tab-pane label="WIFI表历史数据" name="meter">
        <div class="meter">
          <el-card>
          <h3>WIFI表历史数据</h3>
          <div class="operate">
            <div class="datePicker">
              <el-date-picker
                v-model="date2"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <!-- <el-button type="primary" icon="el-icon-search" @click="getMeterHistoryData"></el-button> -->
            </div>
            <div class="search">
              <el-input placeholder="搜索WIFI表通讯地址" v-model="meterSearch"></el-input>
              <el-button type="primary" class="el-icon-search" size="mini" @click="getMeterHistoryData"></el-button>
            </div>
            <!-- <el-button class="upload_btn">
                <i class="fa fa-upload"></i>
                导出
            </el-button> -->
          </div>
          <div class="table">
              <el-table
                :data="meterTableData"
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
                  label="WIFI表名称">
                </el-table-column>
                <el-table-column
                  prop="commaddress"
                  label="通讯地址">
                </el-table-column>
                <el-table-column
                  label="数据时间"
                  :formatter="dateFormatter2">
                </el-table-column>
                <el-table-column
                  prop="zybm"
                  label="表码">
                </el-table-column>
                <el-table-column
                  prop="balancevlaue"
                  label="剩余电量（kWh）">
                </el-table-column>
                <el-table-column
                  prop="signal"
                  label="信号强度">
                </el-table-column>
                <!-- <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button class="el-icon-date" size="mini" @click="getPowerDetail(scope.row)"></el-button>
                  </template>
                </el-table-column> -->
              </el-table>
          </div>
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
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="充电桩历史数据" name="charge">
        <div class="charge">
          <el-card>
          <h3>充电桩历史数据</h3>
          <div class="operate">
            <div class="datePicker">
              <el-date-picker
                v-model="date1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
              <!-- <el-button type="primary" icon="el-icon-search" @click="getChargeHistoryData"></el-button> -->
            </div>
            <div class="search">
              <el-input placeholder="搜索充电桩通讯地址" v-model="chargeSearch"></el-input>
              <el-button type="primary" class="el-icon-search" size="mini" @click="getChargeHistoryData"></el-button>
            </div>
            <!-- <el-button class="upload_btn">
                <i class="fa fa-upload"></i>
                导出
            </el-button> -->
          </div>
          <div class="table">
              <el-table
                :data="waterMeterTableData"
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
                  prop="chargeName"
                  label="充电桩名称">
                </el-table-column>
                <el-table-column
                  prop="commaddress"
                  label="通讯地址">
                </el-table-column>
                <el-table-column
                  prop="plugName"
                  label="插座名称">
                </el-table-column>
                <el-table-column
                  label="数据时间"
                  :formatter="dateFormatter1">
                </el-table-column>
                <el-table-column
                  prop="ia"
                  label="电压（V）">
                </el-table-column>
                <el-table-column
                  prop="ua"
                  label="电流（A）">
                </el-table-column>
                <el-table-column
                  prop="pa"
                  label="功率（kW）">
                </el-table-column>
                <el-table-column
                  prop="totalenergy"
                  label="总能耗（kWh）">
                </el-table-column>
                <!-- <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <el-button class="el-icon-date" size="mini" @click="getPowerDetail(scope.row)"></el-button>
                  </template>
                </el-table-column> -->
              </el-table>
          </div>
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
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>
<script>
export default {
  name: 'energyStatistics',
  data () {
    return {
      active: 'meter',
      date1: [new Date(new Date().setMonth(new Date().getMonth() - 2)), new Date()],
      date2: [new Date(new Date().setMonth(new Date().getMonth() - 2)), new Date()],
      pageParams1: {
        pageNum: 1,
        pageSize: 10,
      },
      pageParams2: {
        pageNum: 1,
        pageSize: 10,
      },
      total1: 0,
      total2: 0,
      meterTableData: [],
      waterMeterTableData: [],
      chargeSearch: '',
      meterSearch: '',
    };
  },
  methods:{
    handleSizeChange1(size) {
      this.pageParams1.pageSize = size
      this.getChargeHistoryData()
    },
    handleCurrentChange1(page) {
      this.pageParams1.pageNum = page
      this.getChargeHistoryData()
    },
    handleSizeChange2(size) {
      this.pageParams2.pageSize = size
      this.getMeterHistoryData()
    },
    handleCurrentChange2(page) {
      this.pageParams2.pageNum = page
      this.getMeterHistoryData()
    },

    getChargeHistoryData() {
      let commaddress = null
      if (this.chargeSearch.trim()) {
        commaddress = this.chargeSearch
      }
      let params = {
        appType: 1,
        commaddress,
        beginAt: this.dateFormat(this.date1[0]),
        endAt: this.dateFormat(this.date1[1]),
        ...this.pageParams1
      }
      this.$request('queryHistory', {params}).then(res => {
        console.log('充电桩历史数据',res)
        this.waterMeterTableData = res.data.items
        this.total1 = res.data.total
      })
    },

    getMeterHistoryData() {
      let commaddress = null
      if (this.meterSearch.trim()) {
        commaddress = this.meterSearch
      }
      let params = {
        appType: 3,
        commaddress,
        beginAt: this.dateFormat(this.date2[0]),
        endAt: this.dateFormat(this.date2[1]),
        ...this.pageParams2
      }
      this.$request('queryHistory', {params}).then(res => {
        console.log('wifi表历史数据',res)
        this.meterTableData = res.data.items
        this.total2 = res.data.total
      })
    },

    dateFormat(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },
    dateFormatter1(row) {
      return this.dateFormat(new Date(row.readtime))
    },
    dateFormatter2(row) {
      return this.dateFormat(new Date(row.datatime))
    },
  },
  mounted() {
    this.getChargeHistoryData()
    this.getMeterHistoryData()
  }
}
</script>
<style lang='scss' scoped>
#powerStatistics {
  padding: 10px;
  background-color: #fff;
  .charge, .meter {
    .el-card {
      /deep/ .el-card__body {
        padding: 0;
      }
      h3 {
        font-size: 16px;
        font-weight: 400;
        color: rgb(48,49,51);
        border-bottom: 1px solid rgb(238,238,238);
        padding: 20px;
        margin-bottom: 20px;
      }
      .operate {
        height: 50px;
        .datePicker {
          display: flex;
          float: left;
          margin-left: 20px;
          .el-button {
            width:40px;
            height:40px;
            padding:0;
            text-align:center;
            border-top-left-radius:0;
            border-bottom-left-radius:0;
          }
        }
        .search {
          display: flex;
          float: left;
          margin-left: 10px;
          .el-input {
            width: 200px;
            /deep/ .el-input__inner {
              height: 40px;
              width: 200px;
              border-radius: 4px 0 0 4px;
            }
          }
          .el-button {
            border-radius: 0 3px 3px 0;
          }
        }
        .upload_btn {
          float: right;
          margin-right: 20px;
        }
      }
      .table {
        margin: 20px;
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

      .el-tabs {
        /deep/ .el-tabs__header {
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
  }

  .el-tabs {
    /deep/ .el-tabs__header {
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
