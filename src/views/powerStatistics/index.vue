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
        <el-button type="primary" icon="el-icon-search"></el-button>
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
  name: 'energyStatistics',
  data () {
    return {
      date: [new Date(+new Date() - 30*24*60*60*1000), new Date()],
      tableData: [],
      pageParams: {
        pageNum: 1,
        pageSize: 10,
        // commaddress: 31000274
      },
      total: 0
    };
  },
  methods:{
    handleSizeChange() {

    },
    handleCurrentChange() {},

    getPowerData() {
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
          }
        }
      }
    }
  }
</style>
