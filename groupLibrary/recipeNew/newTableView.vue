<template>
    <div>
        <pageHeader :title="medinceHead"></pageHeader>
        <div class="layout-content">
            <Row class="vormEespool" :gutter="8">
                <Col span="15" style="visibility:hidden;">1</Col>
                <Col span="7">
                <Input type="text" placeholder="请输入需要查找的药品名称" v-model="STATE.searchName"></Input>
                </Col>
                <Col span="2">
                <Button  type="ghost" icon="ios-search"  long  @click='goPage(1)'>查找</Button>
                </Col>
            </Row>
            <Row>
                <tables :names="names" :tableData="tableData" :page="STATE.page" :goPage='goPage' :actions="actions" />
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
      medinceHead: '新增药品',
      names: {
        name: '药名',
        type: '类型',
        standard: '规格',
        packUnit: '包装单位',
        price: '零售价',
        madeIn: '生产厂商',
        remark: '备注'
      },
      STATE: {
        page: 1,
        totalPage: 1,
        searchName: ''
      },
      tableData: [],
      totalPage: 1,
      state: -1,
      searchName: '',
      actions: [
        {
          icon: 'fa-pencil',
          title: '修改'
        },
        {
          icon: 'fa-check',
          title: '确认'
        },
        {
          icon: 'fa-trash',
          title: '删除'
        }
      ],
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
      this.STATE.classify = ''
      this.goPage(1)
      this.classification = []
      this.loadTree()
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
    goPage: function(page) {
      var vm = this
      $.post(
        serverConfig.serverApi + 'Gl/Drug/getNewDrug',
        {
          page: page,
          limit: 20,
          name: vm.STATE.searchName
        },
        function(result) {
          if (parseInt(result.code) === 0) {
            var mydata = []
            for (var i = 0; i < result.drugs.length; i++) {
              var row = result.drugs[i]
              mydata.push({
                id: row.id,
                type: ['西/成药', '中药'][Number.parseInt(row.type)],
                name: row.name,
                standard: row.spec,
                packUnit: row.unitsTypeName,
                price: row.retailPrice,
                pinyin: row.pinyin,
                madeIn: row.madeIn,
                isDiscount: parseInt(row.isDiscount) === 1 ? '是' : '否',
                remark: row.remark,
                stateVal: row.state
              })
            }
            vm.tableData = mydata
            vm.totalPage = result.totalPage
          }
        }
      )
    },
    loadTree: function() {
      var vm = this
      $.post(serverConfig.serverApi + 'Gl/Drug/searchDrugAll', function(result) {
        if (parseInt(result.code) === 0) {
          vm.classification = result.data.classification
        }
      })
    }
  },
  created: function() {
    var vm = this
    vm.goPage(vm.STATE.page)
  }
}
</script>
<style>
.kutsungi{
  margin-top: 20px;
}
.vormEespool {
  margin-bottom: 10px;
}
.lisada {
  height: 30px;
}
</style>
