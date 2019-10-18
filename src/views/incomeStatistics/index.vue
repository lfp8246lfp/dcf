<template>
  <div id="incomeStatistics">
      <el-card class="filter">

          <div class="date">
            <h3 class="title">时间范围</h3>
            <div class="datePicker">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="border-top-right-radius:0;border-bottom-right-radius:0;">
              </el-date-picker>
              <el-button type="primary" icon="el-icon-search"></el-button>
            </div>
            <div class="shortcut">
              <el-button @click="date = [new Date(+new Date() - 7*24*60*60*1000), new Date()]">近一周</el-button>
              <el-button @click="date = [new Date(+new Date() - 30*24*60*60*1000), new Date()]">近一个月</el-button>
              <el-button @click="date = [new Date(+new Date() - 3*30*24*60*60*1000), new Date()]">近三个月</el-button>
            </div>
          </div>

          <div class="type">
            <h3>收入类型</h3>
            <div class="typeTabs">
              <el-button v-for="item in typeData" :key="item" @click="tabClick(item)">{{item}}</el-button>
            </div>
          </div>
      </el-card>


      <el-card class="data">

        <el-button style="margin-bottom:20px">
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
              prop="time"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="income"
              label="收入">
            </el-table-column>
            <el-table-column
              prop="incomeType"
              label="收入类型">
            </el-table-column>
            <el-table-column
              prop="userName"
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
export default {
  name: 'incomeStatistics',
  data () {
    return {
      date: [new Date(+new Date() - 30*24*60*60*1000), new Date()],
      typeData: ['全部','WIFI电表','WIFI水表','充电站','临时充电设备','房租','物业费','燃气费','押金'],
      active: '',
      tableData: [
        {
          time: '2019-09-23 13:59:11',
          income: 10.0,
          incomeType: 'WIFI表',
          userName: '某某某'
        },
        {
          time: '2019-09-23 13:59:11',
          income: 10.0,
          incomeType: 'WIFI表',
          userName: '某某某'
        },
        {
          time: '2019-09-23 13:59:11',
          income: 10.0,
          incomeType: 'WIFI表',
          userName: '某某某'
        },
        {
          time: '2019-09-23 13:59:11',
          income: 10.0,
          incomeType: 'WIFI表',
          userName: '某某某'
        },
        {
          time: '2019-09-23 13:59:11',
          income: 10.0,
          incomeType: 'WIFI表',
          userName: '某某某'
        },
        
      ],
      total: 100,
    };
  },
  methods:{
    tabClick(i) {
      this.active = i
      console.log(123)
    },
    handleSizeChange() {

    },
    handleCurrentChange() {}
  },
  mounted() {

  }
}
</script>
<style lang='scss' scoped>
  #incomeStatistics {
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    height: 773px;
    .filter {
      flex: 2;
      height: 100%;
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
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .el-button {
            width: 100px;
            height: 40px;
            padding: 0;
            margin-top: 0.3rem;
            text-align: center;
            & + .el-button {
              margin-left: 0;
            }
          }
        }
      }
      .type {
        .typeTabs {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .el-button {
            width: 100px;
            height: 40px;
            padding: 0;
            margin-bottom: 0.3rem;
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
      height: 773px;
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