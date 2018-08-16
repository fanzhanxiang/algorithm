<template>
  <div>
    <Cascader placeholder="请选择药品分类" :data="data" :change-on-select='true' v-model="medicineClassify" @on-visible-change="showMedicine" @on-change='getData'></Cascader>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      modal: false,
      medicineClassify: [],
      plusChildren: ''
    }
  },
  props: {
    classifications: {
      require: true
    }
  },
  created: function() {},
  methods: {
    showMedicine: function() {
      this.modal = true
      this.data = this.classifications
      this.addValue()
    },
    getData(value, selectedData) {
      const vm = this
      vm.medicineClassify = selectedData
      vm.$emit('giveMedicineClassify', selectedData[selectedData.length - 1]['key'])
      vm.$emit('medicineClassifyData', selectedData)
    },
    addValue() {
      const vm = this
      for (var i = 0; i < vm.classifications.length; i++) {
        var curClass = vm.classifications[i]
        curClass.value = curClass.label
        vm.hasChildren(curClass)
      }
    },
    hasChildren(val) {
      const vm = this
      vm.plusChildren = vm.plusChildren + 'children'
      var numberChidren = vm.plusChildren
      if (val[numberChidren]) {
        for (var i = 0; i < val[numberChidren].length; i++) {
          var cur = val[numberChidren][i]
          cur.value = cur.label
        }
      } else {
        return
      }
      vm.hasChildren(val)
    }
  }
}
</script>
<style>
</style>
