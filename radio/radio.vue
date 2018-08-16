<template>
  <div>
    <div :style="wrapRadio">
      <span  v-if="isChecked" :style="radioSelected">
          <text :style="iconStyle">&#xe7fc;</text>
      </span>
      <span   v-else
      :name="name"
      :disabled="disabled"
      :value="value"
      :checked="isChecked"
      @click="change"
      :style="radioNotSelected"
      ></span>
      <text  :style="textStyle"><slot></slot></text>
    </div>
  </div>
</template>
<script>
import RadioCss from './style/index'
export default {
  name: 'Radio',
  data () {
    return {
      currentValue: '',
      isChecked: this.computeCheckState()
    }
  },
  created () {
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('http://at.alicdn.com/t/font_611799_rnixhezz6rp.ttf')"
    })
  },
  model: {
    prop: 'checkedVal',
    event: 'input'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number]
    },
    checked: {
      type: Boolean,
      default: undefined
    },
    name: {
      type: String,
      default: ''
    },
    defaultChecked: {
      type: Boolean,
      default: undefined
    },
    checkedVal: {
      type: [String, Number, Boolean]
    },
    onChange: {
      type: Function
    }
  },
  methods: {
    computeCheckState () {
      if (this.checked !== undefined) {
        return this.checked
      } else if (this.defaultChecked !== undefined) {
        return this.defaultChecked
      } else {
        return this.value === this.checkedVal
      }
    },
    change () {
      console.log(this.checkedVal, this.value)
      if (this.value === undefined && !this.checkedVal) {
        this.isChecked = !this.isChecked
        this.$emit('input', this.isChecked)
        if (this.onChange) {
          this.onChange(this.isChecked)
        }
        this.$emit('change', this.isChecked)
      } else {
        this.$emit('input', this.value)
        if (this.onChange) {
          this.onChange(this.value)
        }
        this.$emit('change', this.value)
      }
    }
  },
  computed: {
    wrapRadio () {
      return RadioCss.wrapRadio
    },
    radioSelected () {
      return RadioCss.radioSelected
    },
    radioNotSelected () {
      if (this.disabled) {
        return RadioCss.radioDisable
      }
      return RadioCss.radioSelected
    },
    iconStyle () {
      return this.disabled ? RadioCss.iconDisable : RadioCss.icon
    },
    textStyle () {
      return RadioCss.textStyle
    }
  },
  watch: {
    checkedVal (val) {
      this.isChecked = this.value === val
    },
    checked (val) {
      this.isChecked = val
    }
  }
}
</script>
<style scope>
/* .textStyle{
  position: absolute;
  left:100px ;
  top:2px;
} */
/* .wrap-radio{
  position: relative;
} */
</style>
