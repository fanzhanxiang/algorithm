<template>
 <div>
  <el-container>
    <el-main>Main</el-main>
    <el-aside width="25%">
      <el-table
        v-if="tableData.length"
        :data="tableData"
        style="width: 100%"
        size="mini">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="姓名"
          width="200">
            <template slot-scope="scope">
              <el-button style="width:40px;height:40px;" @click="handleEdit(scope.$index, scope.row)" circle><img style="width:100%;height: auto;border-radius:50%;overflow:hidden;" :src="scope.row.photo_url" /></el-button>
              <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
            </template>
        </el-table-column>
        <el-table-column
          property="count"
          width="100"
          label="热度">
        </el-table-column>
      </el-table>
    </el-aside>
  </el-container>
 </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit (index, row) {
      let token = row.token
      let url = `https://www.zhihu.com/people/${token}/activities`
      window.location.href = url
    }
  },
  mounted () {},
  created () {
    this.axios.get('http://localhost:8081/raceHot').then((res) => {
      const raceHotData = res.data.data
      raceHotData.sort((a, b) => {
        return Number(b.count) - Number(a.count)
      })
      for (let i = 0; i < raceHotData.length; i++) {
        this.tableData.push(raceHotData[i])
      }
      console.log(raceHotData)
    })
    this.axios.get('http://localhost:8081/raceList').then((res) => {
      const raceListData = res.data.data
      console.log(raceListData, 'raceListData')
    })
  }
}
</script>
