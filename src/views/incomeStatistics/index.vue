<template>
  <div id="incomeStatistics">
      <el-card class="filter">

          <div class="date">
            <h3 class="title">时间范围</h3>
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
              <el-button type="primary" icon="el-icon-search" @click="getRevenue()"></el-button>
            </div>
            <el-row class="shortcut" :gutter="20">
                <el-col :span="8">
                  <el-button @click="dateShortcut()">近一周</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button @click="dateShortcut(1)">近一个月</el-button>
                </el-col>
                <el-col :span="8">
                  <el-button @click="dateShortcut(3)">近三个月</el-button>
                </el-col>
            </el-row>
          </div>

          <div class="type">
            <h3>收入类型</h3>
            <el-row class="typeTabs" :gutter="20">
              <el-col :span="8" v-for="item in typeData" :key="item">
                <el-button @click="tabClick(item)">{{item | typeFilter}}</el-button>
              </el-col>
            </el-row>
          </div>
      </el-card>


      <el-card class="data">

        <el-button style="margin-bottom:20px" class="fa fa-upload" @click="download">
          导出
        </el-button>

        <div class="link" ref="linkRef"></div>
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
              prop="transactionsdate"
              label="时间"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="transactionsvalue"
              label="收入（元）">
            </el-table-column>
            <el-table-column
              prop="detailtype"
              label="收入类型"
              :formatter="formatter1">
            </el-table-column>
            <el-table-column
              prop="chatname"
              label="用户姓名">
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
      </el-card>
  </div>
</template>
<script>
import { exportExcel } from '../../utils/exportExcel'
export default {
  name: 'incomeStatistics',
  data () {
    return {
      date1: new Date(+new Date() - 7*24*60*60*1000),
      date2: new Date(),
      typeData: [0,3,2],
      type: 0,
      tableData: [],
      pageParams: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
    };
  },
  filters: {
    typeFilter(item) {
      switch (item) {
        case 0:
          return '全部';
          break;
        case 3:
          return 'WIFI电表';
          break;
        case 2:
          return '充电桩';
          break;
        case 6:
          return 'WIFI水表';
          break;
        case 7:
          return '临时充电设备';
          break;
        case 8:
          return '房租';
          break;
        case 9:
          return '物业费';
          break;
        case 10:
          return '燃气费';
          break;
        case 11:
          return '押金';
          break;
      }
    }
  },
  methods:{
    dateShortcut(time) {
      // console.log(time)
      this.date2 = new Date()
      if (time) {
        this.date1 = new Date(new Date().setMonth(new Date().getMonth() - time))
      } else {
        this.date1 = new Date(+new Date() - 7*24*60*60*1000)
      }
      // console.log(this.date)
      this.getRevenue()
    },
    tabClick(type) {
      this.pageParams.pageNum = 1
      this.pageParams.pageSize = 10
      this.getRevenue(type)
    },
    handleSizeChange(size) {
      this.pageParams.pageSize = size
      this.getRevenue()
    },
    handleCurrentChange(page) {
      this.pageParams.pageNum = page
      this.getRevenue()
    },

    getRevenue(t = this.type) {
      let type = t === 0 ? null : t
      let params = {
        beginAt: this.dateFormat(this.date1),
        endAt: this.dateFormat(this.date2),
        type,
        ...this.pageParams
      }
      // console.log('收益统计参数', params)
      this.$request('revenueStatistics', {params}).then(res => {
        // console.log('收益统计数据:', res)
        if (res.code === 200) {
          this.tableData = res.data.items
          this.total = res.data.total
          this.type = t
        }
      })
    },

    dateFormat(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1 + '') + '-' + date.getDate() + '' + ' ' + (date.getHours() + '').padStart(2, '0') + ':' + (date.getMinutes() + '').padStart(2, '0') + ':' + (date.getSeconds() + '').padStart(2, '0')
    },

    formatter(row) {
      return this.dateFormat(new Date(row.transactionsdate))
    },
    formatter1(row) {
      switch (row.detailtype) {
        case 0:
          return '全部';
          break;
        case 3:
          return 'WIFI电表';
          break;
        case 2:
          return '充电桩';
          break;
        case 6:
          return 'WIFI水表';
          break;
        case 7:
          return '临时充电设备';
          break;
        case 8:
          return '房租';
          break;
        case 9:
          return '物业费';
          break;
        case 10:
          return '燃气费';
          break;
        case 11:
          return '押金';
          break;
      }
    },

    download() {
      let obj = {
        "beginAt":this.dateFormat(this.date1),
        "endAt":this.dateFormat(this.date2),
        "pageNum":"1",
        "pageSize":"99999999",
        "fileType":"1",
        "replace":{
           "detailtype":{
            "2":"充电桩收益",
            "3":"wifi表收益"
           }
        },
        "list":[
          {"property":"transactionsdate","propertyValue":"时间"},
          {"property":"transactionsvalue","propertyValue":"收入（元）"},
          {"property":"detailtype","propertyValue":"收入类型"},
          {"property":"chatname","propertyValue":"用户姓名"}
        ]
      }


      this.$request('exprotRevenueStatistics', obj, {responseType: 'blob'}).then(res => {
        // console.log(res)
        exportExcel(res, '收入统计')
      })
    },
  },
  mounted() {
    this.getRevenue()
  }
}
</script>
<style lang='scss' scoped>
  #incomeStatistics {
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    .filter {
      flex: 2;
      height: 773px;
      margin-right: 20px;
      h3 {
        font-size: 16px;
        font-weight: 400;
        color: rgb(48,49,51);
        margin-bottom: 25px;
      }
      .date {
        margin-bottom: 50px;
        .datePicker {
          display: flex;
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
        .shortcut {
          // display: flex;
          // justify-content: space-between;
          // flex-wrap: wrap;
          margin-top: 0.3rem;
          .el-button {
            // width: 100px;
            width: 100%;
            height: 40px;
            padding: 0;
            text-align: center;
            & + .el-button {
              margin-left: 0;
            }
          }
        }
      }
      .type {
        .typeTabs {
          // display: flex;
          // justify-content: space-between;
          // flex-wrap: wrap;
          
          .el-button {
            // width: 100px;
            width: 100%;
            height: 40px;
            margin-bottom: 0.3rem;
            padding: 0;
            text-align: center;
            & + .el-button {
              margin-left: 0;
            }
          }
        }
      }
    }
    .data {
      flex: 7;
      min-height: 773px;
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
          }
        }
      }
    }
  }

  
</style>