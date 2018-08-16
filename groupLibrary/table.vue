<template>
  <div>
    <Table size="small" border :columns="columns" :data="tableDatas"></Table>
  </div>
</template>
<script>
export default {
  props: ['names', 'tableData', 'page', 'actions'],
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: 'serialNumber',
          align: 'center'
        },
        {
          title: '药品名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格',
          key: 'standard',
          align: 'center'
        },
        {
          title: '包装单位',
          key: 'packUnit',
          align: 'center'
        },
        {
          title: '零售价',
          key: 'price',
          align: 'center'
        },
        {
          title: '生产厂商',
          key: 'madeIn',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          width: 300
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.clickActions(params.index)
                    }
                  }
                },
                '修改'
              )
            ])
          }
        }
      ]
    }
  },
  components: {},
  methods: {
    clickActions: function(index) {
      const vm = this
      var paramsId = vm.tableData[index].id
      var rowData = vm.tableData[index]
      vm.$router.push({ name: 'recipeEdit', params: { recipeId: paramsId } })
      if (vm.actions[1]) {
        $.post(
          serverConfig.serverApi + 'Gl/drug/updateState',
          {
            id: rowData.id,
            state: parseInt(rowData.stateVal) === 1 ? '0' : '1'
          },
          function(result) {
            if (parseInt(result.code) === 0) {
              if (parseInt(rowData.stateVal) === 1) {
                rowData.stateVal = '0'
                rowData.state = '停用'
              } else {
                rowData.stateVal = '1'
                rowData.state = '正常'
              }
            }
          }
        )
      }
    }
  },
  computed: {
    tableDatas() {
      var vm = this
      for (var i = 0; i < vm.tableData.length; i++) {
        if (parseInt(vm.page)) {
          vm.tableData[i].serialNumber = i + 1
        }
      }
      return vm.tableData
    }
  },
  watch: {},
  created: function() {}
}
</script>
<style>
</style>
