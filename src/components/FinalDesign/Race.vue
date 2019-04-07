<template>
 <div>
  <el-container>
    <el-main>
      <Collapse v-model="value" v-if="raceListData" accordion>
        <Panel v-for="(item,index) in raceListData" :key="index">
            {{item.title}}
            <div slot="content">
               <div @click="jumptoDetail(item)" style="cursor:pointer;">
                  <Avatar shape="square" :src="item.photo_url" />
                  <h3 style="display:inline-block;">{{item.nickname}}</h3>
               </div>
              {{item.content}}
              </div>
        </Panel>
      </Collapse>
    </el-main>

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
              <span style="cursor:pointer" @click="handleEdit(scope.$index, scope.row)"><Avatar  :src="scope.row.photo_url" /></span>
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
      tableData: [],
      value: '0',
      raceListData: ''
    }
  },
  methods: {
    handleEdit (index, row) {
      let token = row.token
      let url = `https://www.zhihu.com/people/${token}/activities`
      window.location.href = url
    },
    jumptoDetail (item) {
      let token = item.token
      let personInfo = `https://www.zhihu.com/people/${token}/activities`
      window.location.href = personInfo
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
    })
    this.axios.get('http://localhost:8081/raceList').then((res) => {
      const raceListData = res.data.data
      this.raceListData = raceListData
      console.log(raceListData, 'raceListData')
    })
  }
}
</script>
