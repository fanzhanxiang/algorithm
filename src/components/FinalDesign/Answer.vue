<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData1.length" :chartData="chartData1" :legendData="legendData1" :title="title1"/></el-col>
      <el-col :span="12"><EchartsCoponent v-if="chartData2.length" :chartData="chartData2" :legendData="legendData2" :title="title2"/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData3.length" :chartData="chartData3" :legendData="legendData3" :title="title3"/></el-col>
    </el-row>

  </div>
</template>

<script>
import EchartsCoponent from './Echarts'
export default {
  data () {
    return {
      chartData1: [],
      chartData2: [],
      chartData3: [],
      legendData1: [],
      legendData2: [],
      legendData3: [],
      title1: '回答字数',
      title2: '获得赞同数',
      title3: '评论数'
    }
  },
  components: {
    EchartsCoponent
  },
  methods: {},
  created () {
    this.axios.get('http://localhost:8081/answer').then((res) => {
      const userData = res.data.data
      let userDataKeys = Object.keys(userData)
      let userDataValue = Object.values(userData)

      for(let i = 0; i < userDataValue.length; i++) {
        let againUserDataValue = Object.values(userDataValue[i])
        let againUserDataKeys = Object.keys(userDataValue[i])
        let legendData = `${'legendData' + (i+1)}`
        this[legendData] = Object.keys(userDataValue[i])
        for(let n = 0; n < againUserDataValue.length; n++) {
          let obj = {}
          obj.value = againUserDataValue[n]
          obj.name = againUserDataKeys[n]
          let chartData = `${'chartData' + (i+1)}`
          this[chartData].push(obj)
          obj = {}
        }
      }
    })
  }
}
</script>

<style scoped>
</style>

