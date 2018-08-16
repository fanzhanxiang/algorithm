<template>
  <div>
    <pageHeader :title="medinceHead"></pageHeader>
    <div class="layout-content">
      <Row class="vormEespool" :gutter="8">
        <Col span="8">
        <Button type="primary" icon="plus" @click="$router.push({name:'recipeAdd'})">
          新增</Button>
        </Col>
        <Col span="7">
        <Form>
          <medicineClassify v-bind:classifications="classification" v-on:medicineClassifyData='medicineClassifyData' />
        </Form>
        </Col>
        <Col span="7">
        <Input type="text" placeholder="请输入药品名称" v-model="STATE.searchName"></Input>
        </Col>
        <Col span="2">
        <Button type="ghost" icon="ios-search"  long  @click='search'>查找</Button>
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
import medicineClassify from './medicineClassify.vue'
import paginations from './pagination'
export default {
  data() {
    return {
      medinceHead: '西/成药',
      names: {
        name: '药品名称',
        standard: '规格',
        packUnit: '包装单位',
        price: '零售价',
        madeIn: '生产厂商',
        remark: '备注'
      },
      STATE: {
        page: 1,
        classify: '',
        totalPage: 1,
        searchName: ''
      },
      tableData: [],
      page: 1,
      totalPage: 1,
      state: -1,
      actions: [
        {
          icon: 'fa-pencil',
          title: '修改'
        }
      ],
      classification: '',
      classify: ''
    }
  },
  components: {
    tables,
    paginations,
    medicineClassify
  },
  methods: {
    search: function() {
      this.page = 1
      this.STATE.classify = ''
      this.goPage(1)
      this.classification = []
      this.loadTree()
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
    goPage: function(page) {
      var vm = this
      $.post(
        serverConfig.serverApi + 'Gl/drug/page',
        {
          page: vm.page,
          limit: 20,
          type: 0,
          name: vm.STATE.searchName,
          typeKey: vm.STATE.classify,
          state: vm.state
        },
        function(result) {
          if (parseInt(result.code) === 0) {
            var mydata = []
            for (let i = 0; i < result.data.length; i++) {
              var row = result.data[i]
              mydata.push({
                id: row.id,
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
              vm.totalPage = result.totalPage
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
    vm.goPage(vm.page)
    vm.loadTree()
  }
}
</script>
<style>
.kutsungi {
  margin-top: 20px;
}
.vormEespool {
  margin-bottom: 10px;
}

.lisada {
  height: 30px;
}
</style>
