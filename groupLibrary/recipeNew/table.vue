<template>
  <div>
    <Table size="small" border :columns="columns" :data="tableDatas"></Table>
    <Modal v-model="cutOut" title="系统提示" @on-ok="confirmDeletion" @on-cancel="cancel">
      <p>确认删除？</p>
    </Modal>
    <Modal v-model="confirm" title="系统提示" @on-ok="ConfirmRemoval" @on-cancel="cancel">
      <p>确认药品信息无误？如果点击确认这个药品将从当前列表移除，如需更改可在所有药品列表中继续修改</p>
    </Modal>
  </div>
</template>
<script>
export default {
  props: ['names', 'tableData', 'page', 'actions', 'goPage'],
  data() {
    return {
      columns: [
        {
          title: '序号',
          key: 'serialNumber',
          align: 'center'
        },
        {
          title: '药名',
          key: 'name',
          align: 'center',
          width: 180
        },
        {
          title: '规格',
          key: 'type',
          align: 'center',
          width: 120
        },
        {
          title: '类型',
          key: 'standard',
          align: 'center',
          width: 100
        },
        {
          title: '包装单位',
          key: 'packUnit',
          align: 'center',
          width: 90
        },
        {
          title: '零售价',
          key: 'price',
          align: 'center'
        },
        {
          title: '生产厂商',
          key: 'madeIn',
          align: 'center',
          width: 200
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          width: 250,
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
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'checkmark'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.clickActionsConfirm(params.index)
                    }
                  }
                },
                '确认'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.clickActionsDelete(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      cutOut: false,
      confirm: false,
      STATE: {
        page: 1,
        totalPage: 1,
        searchName: ''
      }
    }
  },
  components: {},
  methods: {
    clickActions: function(index) {
      const vm = this
      var paramsId = vm.tableData[index].id
      var rowData = vm.tableData[index]
      vm.$router.push({ name: 'recipeNewEdit', params: { recipeId: paramsId } })
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
    },
    clickActionsConfirm: function(index) {
      this.confirm = true
      const vm = this
      var paramsId = vm.tableData[index].id
      vm.paramsId = paramsId
    },
    clickActionsDelete: function(index) {
      this.cutOut = true
      const vm = this
      var paramsId = vm.tableData[index].id
      vm.paramsId = paramsId
    },
    confirmDeletion() {
      const vm = this
      $.post(
        serverConfig.serverApi + 'Gl/Drug/deleteNewDrug',
        {
          drugId: vm.paramsId
        },
        function(result) {
          if (parseInt(result.code) === 0) {
            vm.$Message.info('删除成功')
            vm.goPage(vm.page)
          } else {
            vm.$Message.info('删除失败')
          }
        }
      )
    },
    ConfirmRemoval() {
      const vm = this
      $.post(
        serverConfig.serverApi + 'Gl/Drug/changeNewDrugState',
        {
          drugId: vm.paramsId
        },
        function(result) {
          if (parseInt(result.code) === 0) {
            vm.$Message.info('操作成功')
            vm.goPage(vm.page)
          } else {
            vm.$Message.info('操作失败')
          }
        }
      )
    },
    cancel() {
      this.$Message.info('已取消')
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
