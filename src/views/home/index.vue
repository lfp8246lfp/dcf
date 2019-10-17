<template>
  <div>
    <ul class="list">
      <li>
        <div class="left">
          <span>￥{{data.income}}</span>
          <p>累计总收入</p>
        </div>
        <div class="right">
          <img src="../../../static/images/income.png" alt="">
        </div>
      </li>
      <li>
        <div class="left">
          <span>￥{{data.cash}}</span>
          <p>可提现收入</p>
        </div>
        <div class="right">
          <img src="../../../static/images/cash.png" alt="">
        </div>
      </li>
      <li>
        <div class="left">
          <span>{{data.device}}</span>
          <p>设备总数</p>
        </div>
        <div class="right">
          <img src="../../../static/images/device.png" alt="">
        </div>
      </li>
      <li>
        <div class="left">
          <span>{{data.online}}</span>
          <p>在线设备数</p>
        </div>
        <div class="right">
          <img src="../../../static/images/deviceOnline.png" alt="">
        </div>
      </li>
    </ul>
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card style="position:relative;height:400px">
          <div id="ring">
          </div>
          <div class="total">
            <h3 style="font-size:28px">{{total}}</h3>
            <p style="font-size:14px;color:rgb(164,164,164)">总设备数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="height:400px">
          <el-tabs v-model="active" @tab-click="handleClick">
            <el-tab-pane label="合计" name="first">
              <div id="first"></div>
            </el-tab-pane>
            <el-tab-pane label="WIFI电表" name="second">
              <div id="second"></div>
            </el-tab-pane>
            <el-tab-pane label="WIFI水表" name="third">
              <div id="third"></div>
            </el-tab-pane>
            <el-tab-pane label="充电桩" name="fourth">
              <div id="fourth"></div>
            </el-tab-pane>
            <el-tab-pane label="临时充电设备" name="fifth">
              <div id="fifth"></div>
            </el-tab-pane>
            <el-tab-pane label="房租" name="sixth">
              <div id="sixth"></div>
            </el-tab-pane>
            <el-tab-pane label="物业费" name="seventh">
              <div id="seventh"></div>
            </el-tab-pane>
            <el-tab-pane label="燃气费" name="eighth">
              <div id="eighth"></div>
            </el-tab-pane>
            <el-tab-pane label="押金" name="ninth">
              <div id="ninth"></div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-card>
          <ul style="display:flex;" class="electricity">
            <li>
              <img src="../../../static/images/totalElectricity.png" alt="">
              <p>总用电量</p>
              <span>{{energy.totalElectricity}}kWh</span>
            </li>
            <li>
              <img src="../../../static/images/thisElectricity.png" alt="">
              <p>本月耗电量</p>
              <span>{{energy.thisElectricity}}kWh</span>
            </li>
            <li>
              <img src="../../../static/images/lastElectricity.png" alt="">
              <p>上月耗电量</p>
              <span>{{energy.lastElectricity}}kWh</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ul style="display:flex;" class="water">
            <li>
              <img src="../../../static/images/totalWater.png" alt="">
              <p>总用水量</p>
              <span>{{energy.totalWater}}t</span>
            </li>
            <li>
              <img src="../../../static/images/thisWater.png" alt="">
              <p>本月用水量</p>
              <span>{{energy.thisWater}}t</span>
            </li>
            <li>
              <img src="../../../static/images/lastWater.png" alt="">
              <p>上月用水量</p>
              <span>{{energy.lastWater}}t</span>
            </li>
          </ul>
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
      active: 'first',
      data: {
        income: 6469.5,
        cash: 2333.3,
        device: 1000,
        online: 666
      },
      deviceData: [
          {value:463, name:'WIFI电表'},
          {value:227, name:'WIFI水表'},
          {value:236, name:'充电桩'},
          {value:74, name:'临时充电设备'}
      ],
      energy: {
        totalElectricity: 2333.3,
        thisElectricity: 1284.9,
        lastElectricity: 1186.1,
        totalWater: 233.9,
        thisWater: 14.9,
        lastWater: 15.4,
      }
    };
  },
  computed: {
    total() {
      let arr = this.deviceData.map(item => item.value)
      return arr.reduce((pre,next) => pre + next)
    }
  },
  methods:{

    drawRing(id) {
        this.chart = echarts.init(document.getElementById(id))
        this.chart.setOption({
          title: {
            text: '设备分类统计'
          },
          legend: {
            y: 'bottom',
            data:['WIFI电表','WIFI水表','充电桩','临时充电设备'],
            itemWidth: 14,
            itemHeight: 14,
            textStyle: {
              fontSize: 14
            }
          },
          series: [
            {
              name:'访问来源',
              type:'pie',
              radius: ['40%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  formatter: '{b} \n {d}% \n {c}',
                }
              },
              data: this.deviceData,
              color: ['rgb(82,184,252)','rgb(114,219,119)','rgb(253,177,91)','rgb(255,90,166)']
            }
          ]
        })
    },

    handleClick(e) {
      this.$nextTick(() => {
        this.drawBars(e.name)
      })
    },

    getLast30Days() {
          return new Array(30).fill(undefined).map((item, index) => {
              let day = new Date(+new Date() - index*24*60*60*1000)
              return day.getMonth() + 1 + '-' + day.getDate()
          }).reverse()
    },

    drawBars(id) {
      this.chart = echarts.init(document.getElementById(id))
      this.chart.setOption({
            color: ['#3398DB'],
            grid: {
              left: 30,
              right: 30,
              top: 30
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.getLast30Days(),
                    axisLabel: {
                        margin: 10,
                        interval: 1000,
                        showMinLabel: true,
                        showMaxLabel: true,
                        textStyle: {
                            color: 'rgb(153,153,153)',
                            fontSize: 12,
                        },
                    },
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgb(153,153,153)',
                            fontSize: 12,
                        }
                    },
                    axisLine: {
                      lineStyle: {
                        color: 'rgb(238,238,238)'
                      }
                    },
                }
            ],
            series : [
                {
                    name:'income',
                    type:'bar',
                    barWidth: '30%',
                    data:[10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 10, 52, 200, 334, 390, 330, 220, 123, 456]
                }
            ]
      })
    },
  
  },
  mounted() {
    this.$nextTick(() => {
      this.drawRing('ring')
    })
    this.$nextTick(() => {
      this.drawBars('first')
    })
  }
}
</script>
<style lang='scss' scoped>
  #ring, #first, #second, #third, #fourth, #fifth, #sixth, #seventh, #eighth, #ninth {
    width: 100%;
    height: 350px;
  }
  .total {
    position:absolute;
    left:230px;
    top:50%;
    transform:translate(0,-50%);
    text-align:center
  }
  .list {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    li {
      display: flex;
      width: 375px;
      height: 120px;
      color: #fff;
      border-radius: 3px;
      &:first-of-type {
        background: -webkit-linear-gradient(left, rgb(0,46,142), rgb(36,95,185));
      }
      &:nth-of-type(2) {
        background: -webkit-linear-gradient(left, rgb(39,97,187), rgb(61,121,205));
      }
      &:nth-of-type(3) {
        background: -webkit-linear-gradient(left, rgb(65,122,206), rgb(90,144,223));
      }
      &:last-of-type {
        background: -webkit-linear-gradient(left, rgb(92,147,225), rgb(128,180,250));
      }
      .left {
        flex: 1;
        padding: 20px 0 0 30px;
        span {
          font-size: 28px;
          font-weight: 700;
        }
        p {
          margin-top: 10px;
          font-size: 18px;
        }
      }
      .right {
        flex: 1;
        text-align: right;
        img {
          margin: 36px 36px 0 0;
        }
      }
    }
  }
  .el-row {
    margin-bottom: 30px;
  }
  .electricity, .water {
    li {
      flex: 1;
      border-left: 1px dashed #eee;
      text-align: center;
      box-sizing: border-box;
      &:first-of-type {
        border: 0;
      }
      img {
        width: 64px;
        height: 64px;
        margin-top: 43px;
      }
      p {
        margin: 30px 0 24px;
        color: rgb(102,102,102);
        font-size: 16px;
      }
      span {
        color: rgb(0,0,102);
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .el-tabs {
      /deep/ .el-tabs__nav-wrap::after {
        background-color: #fff!important;
        height: 0!important;
      }  
      /deep/ .el-tabs__nav {
        float: right;
      }
  }

</style>