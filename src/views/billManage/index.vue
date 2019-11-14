<template>
  <div>
    <el-card class="month">
      <div class="pickmonth">选择月份</div>
      <el-date-picker
        v-model="month"
        type="month"
        :placeholder="monthComputed"
        @change="monthChange">
      </el-date-picker>
    </el-card>

    <div class="banner">
      <h2>总收益</h2>
      <p>￥{{total}}</p>
    </div>

    <el-row :gutter="20">
      <el-col :span="14">
        <el-card class="data">
          <ul>
            <li v-for="(item, index) in income" :key="index">
              <!-- <img class="icon" :src="'../../../static/images/icon' + item.typeDetail"> -->
              <img class="icon" :src="'../../../static/images/icon' + item.typeDetail + '.png'">
              <div class="info">
                <h3>{{item.disc}}收益</h3>
                <p v-if="item.Detail">￥{{item.money}}</p>
                <p v-else-if="item.disc === '充电桩'">￥0</p>
                <p v-else-if="item.disc === 'WIFI表'">￥0</p>
                <p v-else>未开通服务</p>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card>
          <h2 style="margin:15px;fontSize:18px">各项收入占比</h2>
          <div id="ring" style="width:100%;height:465px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      month: new Date(),
      income: [],
      total: 0
    };
  },
  mounted() {
    this.getIncomeDate()
  },
  methods:{
    getIncomeDate() {
      let billMonth = this.monthFormat(this.month)
      // let billMonth = this.month.getFullYear() + '-' + (this.month.getMonth() + 1)
      this.$request('billManage',{params: {billMonth}}).then(res => {
        console.log(res)
        this.income = res.data.items
        this.total = res.data.totalMoney
      }).then(res => {
        this.drawRing()
      })
    },
    drawRing() {
        let discData = this.income.filter(item => item.Detail || item.disc === '充电桩' || item.disc === 'WIFI表').map(item => item.disc)
        let valueData = this.income.filter(item => item.Detail || item.disc === '充电桩' || item.disc === 'WIFI表').map(item => ({value: item.money, name: item.disc}))
        this.chart = echarts.init(document.getElementById('ring'))
        this.chart.setOption({
          title: {
            text: '￥' + this.total,
            subtext: '总收入',
            x: 'center',
            y: 'center',
            textStyle: {
              fontSize: 30,
              fontweight: 'normal'
            },
            subtextStyle: {
              fontSize: 14,
              color: 'rgb(164,164,164)'
            }
          },
          legend: {
            y: 'bottom',
            data: discData,
            itemWidth: 14,
            itemHeight: 14,
            textStyle: {
              fontSize: 14
            }
          },
          series: [
            {
              type:'pie',
              radius: ['40%', '50%'],
              avoidLabelOverlap: true,
              label: {
                normal: {
                  formatter: '{b} \n {d}%',
                }
              },
              data: valueData,
              color: ['rgb(82,184,252)','rgb(114,219,119)','rgb(253,177,91)','rgb(255,90,166)']
            }
          ]
        })
    },
    monthFormat(month) {
      return month.getFullYear() + '-' + (month.getMonth() + 1)
    },
    monthChange() {
      this.getIncomeDate()
    },
  
  },
  computed: {
    monthComputed() {
      return this.month.getFullYear() + '-' + (this.month.getMonth() + 1)
    }
  },
}
</script>
<style lang='scss' scoped>
  .month {
    padding-bottom: 20px;
    .pickmonth {
      float: left;
      border: 1px solid rgb(221,224,231);
      border-right: 0;
      width: 88px;
      height: 38px;
      text-align: center;
      line-height: 37px;
      border-radius: 4px 0 0 4px;
    }
    .el-date-editor {
      float: left;
      width: 120px;
      /deep/ .el-input__inner {
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .banner {
    height: 100px;
    padding-top: 40px;
    margin: 20px 0;
    text-align: center;
    color: #fff;
    background: url(../../../static/images/banner.png);
    background-size: 100% 100%;
    border-radius: 5px;
    h2 {
      margin: 0 0 15px;
      font-size: 18px;
      font-weight: normal;
    }
    p {
      font-size: 32px;
    }
  }

  .data {
    position: relative;
    &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 33.3%;
        width: 95%;
        height: 0;
        border-top: 1px dashed rgb(221,224,231);
    }
    &::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 33.3%;
        width: 95%;
        height: 0;
        border-top: 1px dashed rgb(221,224,231);
    }
    ul {
      li {
        display: flex;
        align-items: center;
        float: left;
        width: 33.3%;
        height: 1.88rem;
        margin: 30px 0;
        padding-left: 1rem;
        border-right: 1px solid rgb(221,224,231);
        box-sizing: border-box;
        &:nth-child(3n) {
          border-right: 0;
        }
        .icon {
          width: 48px;
          height: 48px;
          margin-right: 30px;
        }
        .info {
          h3 {
            font-size: 14px;
            color: rgb(144,147,153);
            margin-bottom: 10px;
          }
          p {
            color: #000;
            font-size: 24px;
          }
        }
      }
    }
  }
</style>