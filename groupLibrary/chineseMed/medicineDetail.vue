<template>
    <div>
        <pageHeader :title="formValidate.itemid==undefined || ''?'新增药品':'修改药品信息'">
            <router-link role="button" class="btn btn-default pull-right" :to="{name: 'recipeTableView'}" slot="action">返回</router-link>
        </pageHeader>
        <div class="layout-content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="通用名" prop="commonName">
                        <Input v-model="formValidate.commonName"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="商品名">
                        <Input v-model="formValidate.merchandiseName"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="规格" prop="standard">
                        <Input v-model="formValidate.standard"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="包装单位" prop="units">
                        <Select v-model="formValidate.units">
                            <Option :value='key' v-for='(value,key) in formValidate.unitData' :key="key">{{ value }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="零售价" prop="salePrice">
                        <Input v-model="formValidate.salePrice"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="生产厂家" prop="manufacturer">
                        <Input v-model="formValidate.manufacturer"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="国药准字">
                        <Input v-model="formValidate.quasiWord"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="(次)剂量单位" prop="measureUnits">
                        <Select v-model="formValidate.measureUnits">
                            <Option :value='key' v-for='(value,key) in formValidate.unitData' :key="key">{{ value }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="药品条形码">
                        <Input v-model="formValidate.barCode"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="国际编码">
                        <Input v-model="formValidate.internationalCode"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row :gutter="20">
                    <Col span="9">
                    <FormItem label="备注">
                        <Input v-model="formValidate.remark"></Input>
                    </FormItem>
                    </Col>
                    <Col span="9">
                    <FormItem label="状态">
                        <Select v-model="formValidate.state">
                            <Option value="yes">正常</Option>
                            <Option value="no">停用</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem>
                        <Button type="primary" @click="save">保存</Button>
                        <Button type="ghost" @click="$router.push({name:'recipeCNTableView'})" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Row>
            </Form>
        </div>
    </div>
</template>
<script>
import mixins from '@/common/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      formValidate: {
        itemid: '',
        commonName: '',
        merchandiseName: '',
        englishName: '',
        standard: '',
        units: '',
        dosageFormUnit: '',
        salePrice: '',
        isSeparate: '',
        manufacturer: '',
        quasiWord: '',
        pinyin: '',
        classify: '',
        measureUnits: '',
        measureUnit: [],
        defaultUsage: '',
        frequencyOfUsage: '',
        defaultDosage: '',
        barCode: '',
        internationalCode: '',
        remark: '',
        isDiscount: 0,
        state: 1,
        classifySecond: '',
        classifyThird: '',
        medicineClassify: '',
        medicineKey: '',
        minUnits: '',
        minPrice: '',
        singleUnit: '',
        unitData: '',
        classifications: '',
        dosageFormUnits: '',
        defaultUsages: '',
        frequencyOfUsages: '',
        msg: '',
        scanBarCode: '',
        submitFlag: false
      },
      ruleValidate: {
        commonName: [{ required: true, message: '您还没有填写通用名', trigger: 'blur' }],
        standard: [{ required: true, message: '您还没有填写规格', trigger: 'blur' }],
        units: [{ required: true, message: '您还没有填写包装单位', trigger: 'blur' }],
        salePrice: [{ required: true, message: '您还没有填写零售价', trigger: 'blur' }],
        manufacturer: [{ required: true, message: '您还没有填写生产厂家', trigger: 'blur' }],
        measureUnits: [{ required: true, message: '您还没有填写剂量单位', trigger: 'blur' }]
      }
    }
  },
  methods: {
    save: function() {
      var vm = this
      vm.submitFlag = true
      if (
        vm.formValidate.commonName === '' ||
        vm.formValidate.standard === '' ||
        vm.formValidate.units === '' ||
        vm.formValidate.salePrice === '' ||
        vm.formValidate.manufacturer === '' ||
        vm.formValidate.measureUnits === ''
      ) {
        vm.alert('请填写必填项', false)
      } else {
        $.post(
          serverConfig.serverApi + 'Gl/drug/save',
          {
            type: 1,
            id: vm.formValidate.itemid,
            name: vm.formValidate.commonName,
            goodsName: vm.formValidate.merchandiseName,
            enName: vm.formValidate.englishName,
            spec: vm.formValidate.standard,
            unitsType: vm.formValidate.units,
            dosageType: vm.formValidate.dosageFormUnit,
            retailPrice: vm.formValidate.salePrice,
            isParts: vm.formValidate.isSeparate,
            partsUnits: vm.formValidate.minUnits,
            partsPrice: vm.formValidate.minPrice,
            partsNumber: vm.formValidate.singleUnit,
            madeIn: vm.formValidate.manufacturer,
            standard: vm.formValidate.quasiWord,
            pinyin: vm.formValidate.pinyin,
            typeKey: vm.formValidate.medicineKey ? vm.formValidate.medicineKey : '0',
            dosageUnits: vm.formValidate.measureUnits,
            dosageUsageType: vm.formValidate.defaultUsage,
            dosageFrequencyType: vm.formValidate.frequencyOfUsage,
            dosageUseType: vm.formValidate.defaultDosage,
            barcode: vm.formValidate.barCode,
            code: vm.formValidate.internationalCode,
            remark: vm.formValidate.remark,
            isDiscount: vm.formValidate.isDiscount,
            state: vm.formValidate.state
          },
          function(result) {
            if (parseInt(result.code) === 0) {
              vm.alert('保存成功')
              setTimeout(function() {
                vm.$router.push({ name: 'recipeCNTableView' })
              }, 800)
            }
          }
        )
      }
    }
  },

  created: function() {
    var vm = this
    vm.formValidate.itemid = vm.$route.params.recipeId
    $.post(serverConfig.serverApi + 'Gl/drug/searchDrugAll', function(result) {
      if (parseInt(result.code) === 0) {
        // result.data.classification 药品分类
        // result.data.packingUnit 药品包装单位
        // result.data.dosageFormUnit 药品剂型单位
        // result.data.defaultUsage 药品使用频次
        // result.data.frequencyOfUsage 药品默认用法
        vm.formValidate.classifications = result.data.classification
        vm.formValidate.classify = vm.formValidate.classifications[0].key
        vm.formValidate.unitData = result.data.packingUnit
        vm.formValidate.dosageFormUnits = result.data.dosageFormUnit
        vm.formValidate.defaultUsages = result.data.defaultUsage
        vm.formValidate.frequencyOfUsages = result.data.frequencyOfUsage
      }
    })
    if (vm.formValidate.itemid !== '') {
      $.post(serverConfig.serverApi + 'Gl/drug/detail', { id: vm.formValidate.itemid }, function(result) {
        if (parseInt(result.code) === 0) {
          vm.formValidate.commonName = result.data.name
          vm.formValidate.merchandiseName = result.data.goodsName
          vm.formValidate.englishName = result.data.enName
          vm.formValidate.standard = result.data.spec
          vm.formValidate.units = result.data.unitsType
          vm.formValidate.dosageFormUnit = result.data.dosageType
          vm.formValidate.salePrice = result.data.retailPrice
        }
      })
    }
  },

  computed: {}
}
</script>
<style>
</style>
