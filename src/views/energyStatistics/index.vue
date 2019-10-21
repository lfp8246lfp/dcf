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
            style="width: 100%">
            <el-table-column
              prop="room"
              label="房间名称">
            </el-table-column>
            <el-table-column
              prop="user"
              label="住户名">
            </el-table-column>
            <el-table-column
              prop="meter"
              label="电表编号">
            </el-table-column>
            <el-table-column
              prop="Epower"
              label="用电量">
            </el-table-column>
            <el-table-column
              prop="waterMeter"
              label="水表编号">
            </el-table-column>
            <el-table-column
              prop="Wpower"
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
          :total="100">
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
      tableData: [
        {
          room: 101,
          user: '小明',
          meter: 20190219,
          Epower: '220.1kWh',
          waterMeter: 20190219,
          Wpower: '232.1t',
        },
      ],
    };
  },
  methods:{
    handleSizeChange() {

    },
    handleCurrentChange() {}
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
