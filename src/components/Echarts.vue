<template>
  <div class="echarts">
    <div id="main" style="width: 100%;height:250px;" />
  </div>
</template>

<script>
// function randomData() {
//   now = new Date(+now + oneDay)
//   value = value + Math.random() * 21 - 10
//   return {
//     name: now.toString(),
//     value: [
//       [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
//       Math.round(value)
//     ]
//   }
// }

var data = []
// var now = +new Date(1997, 9, 3)
// var oneDay = 24 * 3600 * 1000
// var value = Math.random() * 1000

import { priceTrend } from '@/api/transaction'
export default {
  name: 'Echarts',
  props: {
    classType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      priceTrend: []
    }
  },
  watch: {
    'classType': function(newType, oldType) {
      console.log(newType)
      this.get_priceTrend()
      this.$parent.show = false
    }
  },
  created() {
    this.get_priceTrend()
  },
  mounted() {
    const vm = this
    setTimeout(function() {
      vm.$nextTick(function() {
        vm.myEcharts()
      })
    }, 1000)
  },
  methods: {
    get_priceTrend() {
      const vm = this
      priceTrend({ type: vm.classType }).then(res => {
        if (res.code === 1) {
          vm.priceTrend = res.data
          data = res.data
        }
      })
    },
    myEcharts() {
      const vm = this
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      var option = {
        grid: {
          top: 20,
          bottom: 30,
          left: 50,
          right: 30
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        series: [{
          name: 'HQC价格',
          type: 'line',
          showSymbol: false,
          data: vm.priceTrend,
          smooth: true
        }]
      }

      // 使用刚指定的配置项和数据显示图表。
      // myChart.setOption(option)
      myChart.setOption(option)
    }
  }
}
</script>

<style>
</style>
