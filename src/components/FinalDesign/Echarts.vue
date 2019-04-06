<template>
  <div>
     <div style="width:100%;height:400px" :ref="echarts"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartsComponents',
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    egendData: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {
    drawChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs[this.echarts])
      let option = {
        title: {
          text: this.title,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.legendData
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // 绘制图表
      myChart.setOption(option)
    }
  },
  watch: {},
  computed: {
    echarts () {
      return 'echarts' + Math.random() * 100000
    }
  },
  mounted: function () {
    const vm = this
    vm.$nextTick(() => {
      vm.drawChart()
    })
  },
  created: () => {}
}
</script>

<style scoped>
</style>
