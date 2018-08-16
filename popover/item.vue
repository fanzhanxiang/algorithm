<template>
    <div
        @click="clickAction"
        @touchstart="activeStart"
        @touchend="activeEnd"
         :style="containerStyle" >
      <!-- <div :style='popoverIconStyle'  v-if="isIcon"><div><Icon :style="popIconStyle" :type="icon" /></div></div> -->
      <div :style='popoverIconStyle'  v-if="isIcon" ><text :style="popIconStyle">&#xe613;</text></div>
      <div :style='popContent'><text :style="popTextStyle"><slot></slot></text></div>
    </div>
</template>
<script>
import Icon from '../icon'
import { oneOf } from '../../utils'
import styles from './style/index.js'
export default {
  name: 'popoverItem',
  components: {
    Icon
  },
  data () {
    return {
      active: false,
      isActive: false,
      isTouch: false
    }
  },
  beforeCreate () {
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('//at.alicdn.com/t/font_611799_j0q6nqqmv9e.ttf')"
    })
  },
  computed: {
    containerStyle () {
      let style = {}
      for (let val in styles.popoverItemContainer) {
        style[val] = styles.popoverItemContainer[val]
      }
      if (this.disabled) {
        for (let valueName in styles.containerDisabled) {
          style[valueName] = styles.containerDisabled[valueName]
        }
        return style
      } else if (this.isTouch) {
        for (let valueNameActive in styles.containerActive) {
          style[valueNameActive] = styles.containerActive[valueNameActive]
        }
        return style
      } else {
        return style
      }
    },
    disabledStyle () {
      return this.disabled ? styles.textDisabled : ''
    },
    isIcon () {
      return oneOf(this.icon, ['check', 'check-circle', 'check-circle-o', 'cross', 'cross-circle', 'cross-circle-o', 'left', 'right', 'down', 'up', 'loading', 'search', 'ellipsis', 'ellipsis-circle', 'exclamation-circle', 'info-circle', 'question-circle', 'voice', 'plus', 'minus', 'dislike', 'fail', 'success'])
    },
    popoverIconStyle () {
      return styles.popoverItemIconStyle
    },
    popoverContent () {
      return this.popoverContent
    },
    popIconStyle () {
      let style = {}
      for (let val in styles.iconStyle) {
        style[val] = styles.iconStyle[val]
      }
      if (this.disabled) {
        for (let newVal in styles.textDisabled) {
          style[newVal] = styles.textDisabled[newVal]
        }
      }
      return style
    },
    popContent () {
      return styles.popoverItemContent
    },
    popTextStyle () {
      let style = {}
      for (let val in styles.textStyle) {
        style[val] = styles.textStyle[val]
      }
      if (this.disabled) {
        for (let newVal in styles.textDisabled) {
          style[newVal] = styles.textDisabled[newVal]
        }
      }
      return style
    }
  },
  props: {
    icon: String,
    disabled: {
      type: Boolean,
      default: false
    },
    value: String,
    itemStyle: Object
  },
  methods: {
    clickAction () {
      if (this.disabled) return
      this.$emit('click')
    },
    activeStart () {
      this.isTouch = true
    },
    activeEnd () {
      this.isTouch = false
    }
  },
  created () {}
}
</script>
<style></style>
