<template>
    <div>
      <ListItem
       :extra="extra"
       :arrow="arrow"
       :align="align"
       :wrap="wrap"
       :onClick="changeList"
       :platform="platform"
       :disabled="disabled"
       >{{Title}}<ListItemBrief slot="itemBrief">{{subtitle}}</ListItemBrief>
      <template slot="extra">
        <Radio
        :name="name"
        :value="value"
        :disabled="disabled"
        :defaultChecked="defaultChecked"
        :checked="currentChecked"
        v-model="currentCheckedVal"
        @change="change"
          ></Radio>
      </template>
      </ListItem>
      <!-- <div  class="iconWrap"><text class="icon">&#xe7fc;</text></div> -->
    </div>
</template>

<script>
import Radio from './radio'
import uList from '@/components/list/list'
import ListItem from '@/components/radio/list-radio-item'
import ListItemBrief from '@/components/list/list-item-brief'
import RadioCss from './style/index'
export default {
  name: 'RadioItem',
  components: {
    Radio,
    uList,
    ListItem,
    ListItemBrief
  },
  model: {
    prop: 'checkedVal',
    event: 'input'
  },
  data () {
    return {
      currentValue: this.value,
      currentCheckedVal: this.checkedVal,
      currentChecked: this.checked
    }
  },
  computed: {
    itemStyle () {
      return this.isTouch ? RadioCss.umListItemActive : RadioCss.umListItem
    },
    iconStyle () {
      return RadioCss.icon
    }
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    wrap: {
      type: Boolean,
      default: false
    },
    platform: {
      type: String,
      default: 'ios'
    },
    align: {
      type: String,
      default: 'middle'
    },
    arrow: {
      type: String
    },
    extra: {
      type: String
    },
    multipleLine: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    },
    Title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    itembrief: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number]
    },
    defaultChecked: {
      type: Boolean,
      default: undefined
    },
    checked: {
      type: Boolean,
      default: undefined
    },
    onClick: {
      type: Function
    },
    checkedVal: [String, Number, Boolean],
    onChange: Function
  },
  beforeCreate () {
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('http://at.alicdn.com/t/font_611799_rnixhezz6rp.ttf')"
    })
  },
  watch: {
    currentCheckedVal (val) {
      this.$emit('input', val)
    },
    checked (val) {
      this.currentChecked = val
    },
    checkedVal (val) {
      this.currentCheckedVal = val
    }
  },
  methods: {
    change (val) {
      if (this.onChange) {
        this.onChange(val)
      }
      this.$emit('change', val)
    },
    activeStart () {
      if (this.onClick) {
        this.isTouch = true
      }
    },
    activeEnd () {
      if (this.onClick) {
        this.isTouch = false
      }
    },
    changeList () {
      // console.log(this.checkedVal, this.value)
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
  }
}
</script>

<style>
/* .um-cbxitem-color {
  color: #bbb;
}
.titleColor{
  color: black;
}
.icon{
  font-family: iconfont;
  color: blue;
  font-size: 50px;
}
.wrapRadioItem{
  flex-direction: row;
  justify-content: center;
}
.iconWrap {
  position: absolute;
  top:20px;
  left:650px;
}
.disabledTitle {
  font-size: 34px;
} */
</style>
