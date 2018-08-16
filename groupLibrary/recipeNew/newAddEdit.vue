<template>
  <div>
    <pageHeader :title="formValidate.itemid==undefined || ''?'新增药品':'修改药品信息'">
      <router-link role="button" class="btn btn-default pull-right" :to="{name: 'recipeNewTableView'}" slot="action">返回</router-link>
    </pageHeader>
    <div class="layout-content">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="通用名" prop="name">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="商品名">
            <Input v-model="formValidate.detail.goodsName"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="英文名称">
            <Input v-model="formValidate.detail.enName"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="规格" prop="spec">
            <Input v-model="formValidate.spec"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="包装单位" prop="unitsType">
            <Select v-model="formValidate.unitsType">
              <Option :value='key' v-for='(value,key) in formValidate.unitData' :key="key">{{ value }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="剂型">
            <Select v-model="formValidate.detail.dosageType">
              <Option :value='key' v-for='(value,key) in formValidate.dosageFormUnits' :key="key">{{ value }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="零售价" prop="retailPrice">
            <Input v-model="formValidate.retailPrice"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="拼音码">
            <Input v-model="formValidate.detail.pinyin" placeholder="如不填写,拼音码会自动生成"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="生产厂家" prop="madeIn">
            <Input v-model="formValidate.madeIn"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="国药准字">
            <Input v-model="formValidate.detail.standard"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="10">
          <FormItem label="是否拆零" prop="isParts">
            <RadioGroup v-model="formValidate.isParts">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20" v-show="formValidate.isParts=='1'">
          <Col span="9">
          <FormItem label="折零单位售价" prop="partsPrice">
            <Input v-model="formValidate.partsPrice"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="折零单位">
            <Select v-model="formValidate.detail.partsUnits">
              <Option :value='key' v-for='(value,key) in formValidate.unitData' :key="key">{{ value }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
          <FormItem label="换算公式">
            <span>1包装单位=</span>
            <Input v-model="formValidate.detail.partsNumber" style="width:50px"></Input>
            <span>拆零单位</span>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="(次)剂量单位" prop="dosageUnits">
            <Select v-model="formValidate.dosageUnits">
              <Option :value='key' v-for='(value,key) in formValidate.unitData' :key="key">{{ value }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="默认用法" prop="dosageUsageType">
            <Select v-model="formValidate.dosageUsageType">
              <Option :value='key' v-for='(value,key) in formValidate.defaultUsages' :key="key">{{ value }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="9">
          <FormItem label="默认用量" prop="dosageUseType">
            <Input v-model="formValidate.dosageUseType"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="药品条形码">
            <Input v-model="formValidate.detail.barcode"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
        <Col span="9">
        <FormItem label="备注">
          <Input v-model="formValidate.detail.remark"></Input>
        </FormItem>
        </Col>
        <Col span="9">
        <FormItem label="状态">
          <Select v-model="formValidate.detail.state">
            <Option value="yes">正常</Option>
            <Option value="no">停用</Option>
          </Select>
        </FormItem>
        </Col>
        </Row>
        <Row>
          <Col span="9">
          <FormItem>
            <Button type="primary" @click="save">保存</Button>
            <Button type="ghost" @click="$router.push({name:'recipeTableView'})" style="margin-left: 8px">取消</Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>
<script>
import formData from './formData.js'
import medicineClassify from './medicineClassify.vue'
export default {
  data() {
    return {
      formValidate: formData.formValidate,
      ruleValidate: formData.ruleValidate
    }
  },
  components: {
    medicineClassify
  },
  created: async function() {
    var vm = this
    vm.formValidate.itemid = vm.$route.params.recipeId
    try {
      var result = await $.post(serverConfig.serverApi + 'Gl/drug/searchDrugAll')
      if (parseInt(result.code) !== 0) {
        return
      }
      vm.formValidate.classifications = result.data.classification
      vm.formValidate.classify = vm.formValidate.classifications[0].key
      vm.formValidate.unitData = result.data.packingUnit
      vm.formValidate.dosageFormUnits = result.data.dosageFormUnit
      vm.formValidate.defaultUsages = result.data.defaultUsage
      vm.formValidate.frequencyOfUsages = result.data.frequencyOfUsage
      result = await $.post(serverConfig.serverApi + 'Gl/drug/detail', {
        id: vm.formValidate.itemid
      })
      if (parseInt(result.code) === 0) {
        const newData = result.data
        vm.formValidate.name = newData.name
        vm.formValidate.detail.goodsName = newData.goodsName
        vm.formValidate.detail.enName = newData.enName
        vm.formValidate.spec = newData.spec
        vm.formValidate.unitsType = newData.unitsType
        vm.formValidate.detail.dosageType = newData.dosageType
        vm.formValidate.retailPrice = newData.retailPrice
        vm.formValidate.detail.pinyin = newData.pinyin
        vm.formValidate.madeIn = newData.madeIn
        vm.formValidate.detail.standard = newData.standard
        vm.formValidate.isParts = newData.isParts
        vm.formValidate.partsPrice = newData.partsPrice
        vm.formValidate.detail.partsNumber = newData.partsNumber
        vm.formValidate.dosageUnits = newData.dosageUnits
        vm.formValidate.dosageNumber = newData.dosageNumber
        vm.formValidate.dosageUsageType = newData.dosageUseType
        vm.formValidate.dosageFrequencyType = newData.dosageFrequencyType
        vm.formValidate.dosageUseType = newData.dosageUseType
        vm.formValidate.detail.barcode = newData.barcode
        vm.formValidate.detail.remark = newData.remark
        vm.formValidate.skinTest = newData.skinTest
      }
    } catch (e) {}
  },
  methods: {
    save() {
      var vm = this
      vm.submitFlag = true
      if (
        vm.formValidate.name === '' ||
        vm.formValidate.unitsType === '' ||
        vm.formValidate.spec === '' ||
        vm.formValidate.retailPrice === '' ||
        vm.formValidate.madeIn === '' ||
        vm.formValidate.dosageUnits === '' ||
        vm.formValidate.dosageFrequencyType === '' ||
        vm.formValidate.dosageUseType === '' ||
        (vm.formValidate.isParts === 1 && vm.formValidate.partsPrice > 0)
      ) {
        vm.msg = '请填写必填项'
        alert.methods.showAlert('danger')
      } else {
        $.post(
          serverConfig.serverApi + 'Gl/drug/save',
          {
            id: vm.formValidate.itemid,
            name: vm.formValidate.name,
            goodsName: vm.formValidate.detail.goodsName,
            enName: vm.formValidate.detail.enName,
            spec: vm.formValidate.spec,
            unitsType: vm.formValidate.unitsType,
            dosageType: vm.formValidate.detail.dosageType,
            retailPrice: vm.formValidate.retailPrice,
            pinyin: vm.formValidate.detail.pinyin,
            madeIn: vm.formValidate.madeIn,
            standard: vm.formValidate.detail.standard,
            isParts: vm.formValidate.isParts,
            partsPrice: vm.formValidate.partsPrice,
            partsUnits: vm.formValidate.detail.partsUnits,
            partsNumber: vm.formValidate.detail.partsNumber, // 一包装单位等于多少拆零单位
            dosageUnits: vm.formValidate.dosageUnits,
            dosageNumber: vm.formValidate.dosageNumber, // 一包装单位等于多少剂量单位
            dosageUsageType: vm.formValidate.dosageUsageType,
            dosageFrequencyType: vm.formValidate.dosageFrequencyType,
            dosageUseType: vm.formValidate.dosageUseType,
            typeKey: vm.formValidate.typeKey || '0',
            barcode: vm.formValidate.detail.barcode,
            code: vm.formValidate.detail.code,
            remark: vm.formValidate.detail.remark,
            skinTest: vm.formValidate.skinTest,
            state: vm.formValidate.detail.state,
            lot: vm.formValidate.detail.lot,
            shID: vm.formValidate.detail.shID,
            takePlaceType: vm.formValidate.detail.takePlaceType,
            isDiscount: vm.formValidate.detail.isDiscount
          },
          result => {
            console.log(result)
            if (result.code === 0) {
              this.$Message.success('保存成功')
              vm.$router.push({ name: 'recipeTableView' })
            } else {
              this.$Message.error('保存失败')
            }
            setTimeout(() => {
              this.$router.push({ name: 'recipeNewTableView' })
            }, 800)
          }
        )
      }
    },
    getMedicineClassify(data) {
      const vm = this
      vm.formValidate.typeKey = data
    }
  }
}
</script>
<style>
.conversionFormula {
  position: relative;
}
.conversionFormula .dismantlingUnit {
  position: absolute;
  top: 40px;
}
.conversionFormula .ivu-input {
  left: 80px;
  width: 70px;
}
.conversionFormula .doseUnit {
  position: absolute;
  left: 160px;
  top: 40px;
}
</style>
