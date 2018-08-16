const formValidate = {
  classify: '',
  measureUnit: [],
  address: 1,
  classifySecond: '',
  classifyThird: '',
  classifyForth: '',
  medicineClassify: '',
  unitData: '',
  classifications: '',
  dosageFormUnits: '',
  defaultUsages: '',
  frequencyOfUsages: '',
  msg: '',
  submitFlag: false,
  isSeparate: 0,
  detail: { isDiscount: 0, state: 1, isParts: 0 },
  name: '',
  spec: '',
  typeKey: '',
  unitsType: '',
  retailPrice: '',
  madeIn: '',
  isParts: '0',
  partsPrice: '',
  dosageUnits: '',
  dosageNumber: '',
  dosageUsageType: '',
  dosageFrequencyType: '',
  dosageUseType: ''
}
const ruleValidate = {
  name: [{ required: true, message: '您还没有填写通用名', trigger: 'blur' }],
  spec: [{ required: true, message: '您还没有填写规格', trigger: 'blur' }],
  unitsType: [{ required: true, message: '您还没有填写包装单位', trigger: 'blur' }],
  retailPrice: [{ required: true, message: '您还没有填写零售价', trigger: 'blur' }],
  madeIn: [{ required: true, message: '您还没有填写生产厂家', trigger: 'blur' }],
  isParts: [{ required: true, message: '您还没有选择是否拆零', trigger: 'blur' }],
  partsPrice: [{ required: true, message: '您还没有选择拆零售价', trigger: 'blur' }],
  dosageUnits: [{ required: true, message: '您还没有选择剂量单位', trigger: 'blur' }],
  dosageNumber: [{ required: true, message: '您还没有填写换算公式', trigger: 'blur' }],
  dosageUsageType: [{ required: true, message: '您还没有填写默认用法', trigger: 'blur' }],
  dosageFrequencyType: [{ required: true, message: '您还没有填写默认频次', trigger: 'blur' }],
  dosageUseType: [{ required: true, message: '您还没有填写默认用量', trigger: 'blur' }]
}
export default {
  ruleValidate,
  formValidate
}
