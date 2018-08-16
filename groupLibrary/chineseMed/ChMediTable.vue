<template>
  <div>
    <pageHeader :title="medinceHead"></pageHeader>
    <div class="layout-content">
      <Row class="vormEespool" :gutter="8">
        <Col span="15">
        <Button type="primary" icon="plus" @click="$router.push({name:'recipeCNAdd'})">新增</Button>
        </Col>
        <Col  span="7">
        <Input type="text" placeholder="请输入处方医嘱名称" v-model="searchName"></Input>
        </Col>
        <Col span="2">
        <Button type="ghost" icon="ios-search"  @click='search' long>查找</Button>
        </Col>
      </Row>
      <Row>
        <tables :names="names" :tableData="tableData" :page="page" :actions="actions" />
      </Row>
      <Row type="flex" justify="end" class="code-row-bg kutsungi">
        <paginations :total-page="totalPage" v-on:changePage="showChangePage" />
      </Row>
      <Row class="lisada"></Row>
    </div>
  </div>
</template>
<script>
import tables from './table.vue'
import paginations from './pagination'
export default {
  data() {
    return {
      medinceHead: '中药',
      names: {
        name: '处方医嘱名称',
        standard: '规格',
        packUnit: '包装单位',
        price: '零售价',
        madeIn: '生产厂商',
        isDiscount: '允许折扣',
        remark: '备注'
      },
      tableData: [],
      page: 1,
      totalPage: 1,
      state: '-1',
      searchName: '',
      actions: [{ icon: '', title: '修改' }],
      classification: '',
      classify: ''
    }
  },
  components: {
    tables,
    paginations
  },
  methods: {
    search: function() {
      this.page = 1
      this.goPage()
    },
    medicineClassifyData: function(classifyData) {
      this.openTree(classifyData[classifyData.length - 1]['key'])
    },
    openTree: function(classify) {
      var vm = this
      vm.STATE.classify = classify
      vm.goPage(1)
    },
    showChangePage: function(data) {
      var vm = this
      vm.page = data
      this.goPage(vm.page)
    },
    goPage: function() {
      var vm = this
      $.post(
        serverConfig.serverApi + 'Gl/drug/page',
        {
          page: vm.page,
          limit: 20,
          type: 1,
          name: vm.searchName,
          typeKey: vm.classify,
          state: vm.state
        },
        function(result) {
          if (parseInt(result.code) === 0) {
            // console.log(result.data)
            var mydata = []
            for (var i = 0; i < result.data.length; i++) {
              var row = result.data[i]
              mydata.push({
                id: row.id,
                name: row.name,
                standard: row.spec,
                packUnit: row.dosageUnits,
                price: row.retailPrice,
                pinyin: row.pinyin,
                madeIn: row.madeIn,
                isDiscount: parseInt(row.isDiscount) === 1 ? '是' : '否',
                remark: row.remark,
                stateVal: row.state
              })
            }
            // console.log(mydata)
            vm.tableData = mydata
            vm.totalPage = result.totalPage
          }
          vm.state = -1
        }
      )
    }
  },
  created: function() {
    var vm = this
    vm.goPage(1)
  }
}
</script>
<style>
.vormEespool {
  margin-bottom: 10px;
}
.kutsungi {
  margin-top: 20px;
}
.lisada {
  height: 30px;
}
</style>
