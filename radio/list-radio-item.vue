<template>
  <div :style="itemStyle" @click="click" @touchstart="activeStart" @touchend="activeEnd">
    <div :style="styles.umListItemThumb" v-if="isThumb">
      <slot name="thumb">
        <image :style="styles.umListItemThumbImg" src="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"/>
      </slot>
    </div>
    <div :style="lineStyle">
      <div :style="styles.umListItemContent">
        <text  :style="contentTextStyle" class="disableTitle"><slot></slot></text>
        <slot name="itemBrief"></slot>
      </div>
      <div :style="styles.umListItemExtra" v-if="isExtra">
        <text :style="styles.umListItemExtraText">{{ extra }}</text>
        <slot name="extra"></slot>
      </div>
      <div :style="arrowStyle" aria-hidden="true" v-if="arrow">
        <text :style="styles.umListItemArrowIcon">&#xe62d;</text>
      </div>
    </div>
  </div>
</template>
<script>
import styles from './style/index.js'
export default {
  name: 'ListRadioItem',
  data () {
    return {
      styles: styles,
      isThumb: false,
      isExtra: false,
      isTouch: false
    }
  },
  computed: {
    itemStyle () {
      return this.isTouch ? styles.umListItemActive : styles.umListItem
    },
    lineStyle () {
      return { ...styles.umListItemLine, ...styles[`umListItemLine${this.align}`] }
    },
    contentTextStyle () {
      // return this.wrap ? styles.umListItemContentTextWrap : styles.umListItemContentText
      if (this.disabled) {
        return styles.radioDisable
      } else {
        return this.wrap ? styles.umListItemContentTextWrap : styles.umListItemContentText
      }
    },
    arrowStyle () {
      return { ...styles.umListItemArrow, ...styles[`umListItemArrow${this.arrow}`] }
    }
  },
  beforeCreate () {
    var domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('//at.alicdn.com/t/font_751486_6s45t80c9eo.ttf')"
    })
  },
  mounted () {
    this.isExtra = this.$slots.extra !== undefined || this.extra
    this.isThumb = this.$slots.thumb !== undefined || this.thumb
  },
  props: {
    thumb: {
      type: String
    },
    extra: {
      type: String
    },
    arrow: {
      type: String
    },
    align: {
      type: String,
      default: 'middle'
    },
    onClick: {
      type: Function
    },
    wrap: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click (ev) {
      if (!this.disabled) {
        this.$emit('onClick')
        if (this.onClick) {
          this.onClick(ev)
        }
      }
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
    }
  }
}
</script>
<style scope>
.disableTitle{
  color: #bbbbbb;
}
</style>
