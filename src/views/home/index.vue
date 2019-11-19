<template>
  <div>
    <el-row :gutter="30">
      <el-col :span="6">
        <div class="outline">
          <div class="left">
            <span>￥{{homeData.totalMoney}}</span>
            <p>累计总收入</p>
          </div>
          <div class="right">
            <img src="../../../static/images/income.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="outline">
          <div class="left">
            <span>￥{{homeData.withdrawalBalance}}</span>
            <p>可提现收入</p>
          </div>
          <div class="right">
            <img src="../../../static/images/cash.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="outline">
          <div class="left">
            <span>{{homeData.allDevCount}}</span>
            <p>设备总数</p>
          </div>
          <div class="right">
            <img src="../../../static/images/device.png" alt="">
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="outline">
          <div class="left">
            <span>{{homeData.onlinedev}}</span>
            <p>在线设备数</p>
          </div>
          <div class="right">
            <img src="../../../static/images/deviceOnline.png" alt="">
          </div>
        </div>
      </el-col>
    </el-row>
      
    <el-row :gutter="30">
      <el-col :span="8">
        <el-card style="height:400px">
          <h3 style="font-size:18px;">设备分类统计</h3>
          <div class="chart" style="position:relative">
            <div id="ring">
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="height:400px;position:relative">
          <h3 class="title" style="position:absolute;left:30px;top:20px;font-size:18px;">近30天收益统计</h3>
          <el-tabs v-model="active" @tab-click="handleClick">
            <el-tab-pane label="合计" name="type">
              <div id="type"></div>
            </el-tab-pane>
            <el-tab-pane label="WIFI电表" name="type3">
              <div id="type3"></div>
            </el-tab-pane>
            <el-tab-pane label="充电桩" name="type2">
              <div id="type2"></div>
            </el-tab-pane>
            <!-- <el-tab-pane label="WIFI水表" name="type6">
              <div id="type6"></div>
            </el-tab-pane>
            <el-tab-pane label="临时充电设备" name="type7">
              <div id="type7"></div>
            </el-tab-pane>
            <el-tab-pane label="房租" name="type8">
              <div id="type8"></div>
            </el-tab-pane>
            <el-tab-pane label="物业费" name="type9">
              <div id="type9"></div>
            </el-tab-pane>
            <el-tab-pane label="燃气费" name="type10">
              <div id="type10"></div>
            </el-tab-pane>
            <el-tab-pane label="押金" name="type11">
              <div id="type11"></div>
            </el-tab-pane> -->
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="30">
      <el-col :span="12">
        <el-card>
          <ul style="display:flex;" class="electricity">
            <li>
              <img src="../../../static/images/incomeFullYear.png" alt="">
              <p>年收入</p>
              <span>￥{{homeData.yearMoney}}</span>
            </li>
            <li>
              <img src="../../../static/images/incomeThisMonth.png" alt="">
              <p>本月收入</p>
              <span>￥{{homeData.thisMonthMoney}}</span>
            </li>
            <li>
              <img src="../../../static/images/incomeLastMonth.png" alt="">
              <p>上月收入</p>
              <span>￥{{homeData.lastMonthMoney}}</span>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <ul style="display:flex;" class="water">
            <li>
              <img src="../../../static/images/userTotal.png" alt="">
              <p>用户数</p>
              <span>{{homeData.usernum}}</span>
            </li>
            <li>
              <img src="../../../static/images/userNormal.png" alt="">
              <p>正常用户数</p>
              <span>{{homeData.normalnum}}</span>
            </li>
            <li>
              <img src="../../../static/images/userError.png" alt="">
              <p>告警用户数</p>
              <span>{{homeData.alarmnum}}</span>
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
      active: 'type',
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
      
      homeData: {},
      recentData: {
        xAxis: [],
        yAxis: []
      }
    };
  },
  methods:{
    drawRing(id) {
        let names = ['WIFI电表','WIFI水表','充电桩','临时充电设备']
        let datas = [this.homeData.wifinum, this.homeData.watermeter, this.homeData.chargingnum, this.homeData.temporary]
        let total = this.homeData.allDevCount

        let myChart = echarts.init(document.getElementById(id))
        myChart.setOption({
          title: {
            text: this.homeData.allDevCount,
            subtext: '总设备数',
            x: 'center',
            y: '35%',
            textStyle: {
              fontSize: 28
            },
            grid: {
              top: '10%',
            },
            subtextStyle: {
              fontSize: 14,
              color: 'rgb(164,164,164)'
            },
            itemGap: 0
          },
          tooltip: {
            show: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: '10%',
            data: ['WIFI电表','WIFI水表','充电桩','临时充电设备'],
            itemWidth: 14,
            itemHeight: 14,
            itemGap: 30,
            textStyle: {
              lineHeight: 24,
              rich: {
                a: {
                  fontSize: 12,
                  color: 'rgb(164,164,164)',
                },
                b: {
                  fontSize: 24,
                  color: 'rgb(44,52,69)',
                },
                c: {
                  fontSize: 14,
                  color: 'rgb(103,110,120)',
                }
              }
            },
            
            formatter: name => {
              let data = datas[names.findIndex(item => item === name)]
              let a = '{a|' + name + '}'
              let b = '{b|' + (data / total * 100).toFixed(2) + '%}'
              if (total === 0) {
                b = '{b|0%}'
              }
              let c = '{c|' + data + '}'
              return [a, b, c].join('\n')
            }
          },
          series: [
            {
              name:'设备类型',
              type:'pie',
              radius: ['40%', '50%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: true,
              label: {
                normal: {
                  formatter: '{b} \n {d}% \n {c}',
                  show: false
                }
              },
              data: [
                {value:this.homeData.wifinum, name:'WIFI电表'},
                // {value:this.homeData.watermeter, name:'WIFI水表'},
                {value:this.homeData.chargingnum, name:'充电桩'},
                // {value:this.homeData.temporary, name:'临时充电设备'}
              ],
              color: ['rgb(82,184,252)','rgb(114,219,119)','rgb(253,177,91)','rgb(255,90,166)']
            }
          ],
        })


        window.onresize = () => myChart.resize()
    },

    handleClick(e) {
      this.getLast30Days(e.name)
    },

    getLast30Days(name) {
      
      let type = name.slice(4).length > 0 ? Number(name.slice(4)) : null

      this.$request('recentEarnings', {params: {type}}).then(res => {
        if (res.code === 200) {
          console.log('recentEarnings', res)
          this.recentData = {
            xAxis: res.data.monthTranctions.map(item => item.date.slice(5)),
            yAxis: res.data.monthTranctions.map(item => item.money)
          }
        }
      }).then(res => {
        this.drawBars(name)
      })
    },

    drawBars(id) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption({
            color: ['#3398DB'],
            grid: {
              left: 50,
              right: 30,
              top: 30,
              bottom: 70
            },
            tooltip: {
              show: true,
              formatter: '{b}<br/>{a}: {c}元'
            },
            xAxis : [
                {
                    type : 'category',
                    data : this.recentData.xAxis,
                    axisLabel: {
                        interval: 1,
                        textStyle: {
                            color: 'rgb(153,153,153)',
                            fontSize: 12,
                        },
                    },
                    axisLine: {
                      lineStyle: {
                        color: 'rgb(238,238,238)'
                      }
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
                name:'收入',
                type:'bar',
                barWidth: '30%',
                data:this.recentData.yAxis,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: true,
                    position: 'outside',
                    color: '#3398DB'
                  }
                }
              }
            ]
      })

      window.onresize = () => myChart.resize()
    },

    getHomeData() {
      this.$request('homeData').then(res => {
        console.log('homeData', res)
        if (res.code === 200) {
          this.homeData = res.data
        }
      }).then(res => {
        this.drawRing('ring')
      })
    }
  },
  mounted() {
    this.getHomeData()
    this.getLast30Days('type')
  }
}
</script>
<style lang='scss' scoped>
  [id] {
    width: 100%;
    height: 5.5rem;
    // height: 350px;
  }
  .el-row {
    margin-bottom: 30px;
    .el-col {
      .outline {
        display: flex;
        height: 120px;
        color: #fff;
        border-radius: 3px;
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
      &:first-child {
        .outline {
          background: -webkit-linear-gradient(left, rgb(0,46,142), rgb(36,95,185));
        }
      }
      &:nth-child(2) {
        .outline {
          background: -webkit-linear-gradient(left, rgb(39,97,187), rgb(61,121,205));
        }
      }
      &:nth-child(3) {
        .outline {
          background: -webkit-linear-gradient(left, rgb(65,122,206), rgb(90,144,223));
        }
      }
      &:last-child {
        .outline {
          background: -webkit-linear-gradient(left, rgb(92,147,225), rgb(128,180,250));
        }
      }
    }
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
      /deep/ .el-tabs__item {
        padding: 0 10px;
      }
  }

</style>