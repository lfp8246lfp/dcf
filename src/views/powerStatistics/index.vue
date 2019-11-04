<template>
  <div id="energyStatistics">
    <el-card>
      <h3>单位列表</h3>

      <div class="datePicker">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="border-top-right-radius:0;border-bottom-right-radius:0;">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="getPowerData"></el-button>
      </div>

      <el-button style="float:right;margin-bottom:20px;margin:-41px 20px 0;">
          <i class="fa fa-upload"></i>
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
              prop="roomid"
              label="房间名称">
            </el-table-column>
            <el-table-column
              prop="roomname"
              label="住户名">
            </el-table-column>
            <el-table-column
              prop="commaddress1"
              label="电表编号">
            </el-table-column>
            <el-table-column
              prop="electricityconsumption"
              label="用电量">
            </el-table-column>
            <el-table-column
              prop="commaddress2"
              label="水表编号">
            </el-table-column>
            <el-table-column
              prop="waterconsumption"
              label="用水量">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button class="el-icon-date" size="mini" @click="getPowerDetail(scope.row)"></el-button>
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


      <el-dialog title="历史记录" :visible.sync="dialogTableVisible">

        <el-tabs v-model="active" type="card">
          <el-tab-pane label="WIFI电表" name="first">
            <el-table 
              :data="meterTableData"
              border
              stripe 
              style="width: 100%"
              :header-cell-style="{background:'rgb(250,250,250)'}">
              <el-table-column label="时间"></el-table-column>
              <el-table-column label="电表示数"></el-table-column>
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
          </el-tab-pane>

          <el-tab-pane label="WIFI水表" name="second">
            <el-table 
              :data="waterMeterTableData"
              border
              stripe 
              style="width: 100%"
              :header-cell-style="{background:'rgb(250,250,250)'}">
              <el-table-column label="时间"></el-table-column>
              <el-table-column label="水表示数"></el-table-column>
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
          </el-tab-pane>
        </el-tabs>

      </el-dialog>

    </el-card>
  </div>
</template>
<script>
export default {
  name: 'energyStatistics',
  data () {
    return {
      date: [new Date(+new Date() - 30*24*60*60*1000), new Date()],
      beginAt: '',
      endAt: '',
      tableData: [],
      pageParams: {
        pageNum: 1,
        pageSize: 10,
      },
      pageParams1: {
        pageNum: 1,
        pageSize: 10,
      },
      pageParams2: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      total1: 0,
      total2: 0,
      dialogTableVisible: false,
      meterTableData: [],
      waterMeterTableData: [],
      active: 'first',
      commaddress1: '',
      commaddress2: ''
    };
  },
  methods:{
    handleSizeChange(size) {
      this.pageParams.pageSize = size
      this.getPowerData()
    },
    handleCurrentChange(page) {
      this.pageParams.pageNum = page
      this.getPowerData()
    },
    handleSizeChange1(size) {
      this.pageParams1.pageSize = size
      this.sendReq1()
    },
    handleCurrentChange1(page) {
      this.pageParams1.pageNum = page
      this.sendReq1()
    },
    handleSizeChange2(size) {
      this.pageParams2.pageSize = size
      this.sendReq2()
    },
    handleCurrentChange2(page) {
      this.pageParams2.pageNum = page
      this.sendReq2()
    },

    getPowerData(row) {
      let params = {
        beginAt: this.dateFormat(this.date[0]),
        endAt: this.dateFormat(this.date[1]),
        ...this.pageParams
      }
      console.log('用能统计参数',params)
      this.$request('energyStatistics', {params}).then(res => {
        console.log('用能统计',res.data)
        this.tableData = res.data.items
        this.total = res.data.total
        this.beginAt = params.beginAt
        this.endAt = params.endAt
      })
    },

    getPowerDetail(row) {
      this.commaddress1 = row.commaddress1
      this.commaddress2 = row.commaddress2
      this.sendReq1()
      this.sendReq2()
      this.dialogTableVisible = true
    },

    sendReq1() {
      let params = {
        beginAt: this.beginAt,
        endAt: this.endAt,
        commaddress: this.commaddress1,
        ...this.pageParams1
      }
      this.$request('energyStatisticsDetail', {params}).then(res => {
        this.meterTableData = res.data.items
        this.total1 = res.data.total
      })
    },
    sendReq2() {
      let params = {
        beginAt: this.beginAt,
        endAt: this.endAt,
        commaddress: this.commaddress2,
        ...this.pageParams2
      }
      this.$request('energyStatisticsDetail', {params}).then(res => {
        this.waterMeterTableData = res.data.items
        this.total2 = res.data.total
      })
    },

    dateFormat(date) {
      return '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },
  },
  mounted() {
    this.getPowerData()
  }
}
</script>
<style lang='scss' scoped>
  #energyStatistics {
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
      .datePicker {
        display: flex;
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
</style>
