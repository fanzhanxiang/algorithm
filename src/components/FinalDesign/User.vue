<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData1.length" :chartData="chartData1" :legendData="legendData1" :title="title1"/></el-col>
      <el-col :span="12"><EchartsCoponent v-if="chartData2.length" :chartData="chartData2" :legendData="legendData2" :title="title2"/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData3.length" :chartData="chartData3" :legendData="legendData3" :title="title3"/></el-col>
      <el-col :span="12"><EchartsCoponent v-if="chartData4.length" :chartData="chartData4" :legendData="legendData4" :title="title4"/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData5.length" :chartData="chartData5" :legendData="legendData5" :title="title5"/></el-col>
      <el-col :span="12"><EchartsCoponent v-if="chartData6.length" :chartData="chartData6" :legendData="legendData6" :title="title6"/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData7.length" :chartData="chartData7" :legendData="legendData7" :title="title7"/></el-col>
      <el-col :span="12"><EchartsCoponent v-if="chartData8.length" :chartData="chartData8" :legendData="legendData8" :title="title8"/></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><EchartsCoponent v-if="chartData9.length" :chartData="chartData9" :legendData="legendData9" :title="title9"/></el-col>
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
      chartData4: [],
      chartData5: [],
      chartData6: [],
      chartData7: [],
      chartData8: [],
      chartData9: [],
      legendData1: [],
      legendData2: [],
      legendData3: [],
      legendData4: [],
      legendData5: [],
      legendData6: [],
      legendData7: [],
      legendData8: [],
      legendData9: [],
      title1: '性别',
      title2: '获得赞同数',
      title3: '粉丝数量',
      title4: '赞同人数',
      title5: '关注其它用户数量',
      title6: '回答问题数量',
      title7: '文章数量',
      title8: '想法数量',
      title9: '参见live数量'
    }
  },
  components: {
    EchartsCoponent
  },
  methods: {},
  created () {
    this.axios.get('http://localhost:8081/user').then((res) => {
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

