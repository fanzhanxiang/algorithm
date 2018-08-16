<template>
  <div :style="wrapper">
     <div @click="wxcPopoverShow" ref="target"><slot></slot></div>
     <div :style="maskStyle"
         ref="wxc-cover"
         v-if="show && mask"
         @touchend="hideAction"
  ></div>
  <div ref="popover"
        v-if="show"
        :style="contentStyle">
    <div :style="arrowStyle"></div>
    <div :style="uPopoverInnerstyle">
      <slot name="overlay" v-bind:select="select"></slot>
    </div>
   </div>
</div>
</template>

<script>
import { oneOf } from '../../utils'
import styles from './style/index.js'
const domModule = weex.requireModule('dom')
export default {
  props: {
    mask: {
      type: Boolean,
      default: false
    },
    placement: {
      validator (value) {
        return oneOf(value, [
          'left',
          'right',
          'top',
          'bottom',
          'topLeft',
          'topRight',
          'bottomLeft',
          'bottomRight'
        ])
      },
      default: 'bottomRight'
    }
  },
  data: () => ({
    show: false,
    showIn: false,
    size: {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    position: {
      x: 0,
      y: 0
    },
    popoverMessage: {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    refIsGet: false
  }),
  computed: {
    contentStyle () {
      let pos = this.placement
      let style = {}
      for (let valueName in styles.gPopover) {
        style[valueName] = styles.gPopover[valueName]
      }
      let { x = 0, y = 0 } = this.position
      let targetHeight = this.size.height
      let targetWidth = this.size.width
      let popoverHeight = this.popoverMessage.height
      let popoverWidth = this.popoverMessage.width
      switch (pos) {
        case 'top':
          style.left = `${x - (popoverWidth / 2)}px`
          style.top = `${y - targetHeight - popoverHeight - 20}px`
          break
        case 'topLeft':
          style.left = `${x - popoverWidth}px`
          style.top = `${y - targetHeight - popoverHeight - 20}px`
          break
        case 'topRight':
          style.left = `${x + targetWidth}px`
          style.top = `${y - targetHeight - popoverHeight - 20}px`
          break
        case 'bottom':
          style.left = `${x - (popoverWidth / 2)}px`
          style.top = `${y + targetHeight + 20}px`
          break
        case 'bottomLeft':
          style.left = `${x + targetWidth}px`
          style.top = `${y + targetHeight + 20}px`
          break
        case 'bottomRight':
          style.left = `${x - popoverWidth}px`
          style.top = `${y + targetHeight + 20}px`
          break
        case 'left':
          style.left = `${x - popoverWidth - 20}px`
          style.top = `${y - (popoverHeight / 2)}px`
          break
        case 'right':
          style.left = `${x + 60}px`
          style.top = `${y - (popoverHeight / 2)}px`
          break
        default:
          break
      }
      return style
    },
    arrowStyle () {
      let pos = this.placement
      let popoverHeight = this.popoverMessage.height
      let popoverWidth = this.popoverMessage.width
      let style = {}
      for (let valueName in styles.uPopoverArrow) {
        style[valueName] = styles.uPopoverArrow[valueName]
      }
      switch (pos) {
        case 'top':
          style.left = `${popoverWidth / 2 - 15}px`
          style.top = `${popoverHeight - 30}px`
          break
        case 'topLeft':
          style.right = `45px`
          style.top = `${popoverHeight - 30}px`
          break
        case 'topRight':
          style.left = '45px'
          style.top = `${popoverHeight - 30}px`
          break
        case 'bottom':
          style.left = `${popoverWidth / 2 - 15}px`
          style.top = `0px`
          break
        case 'bottomLeft':
          style.top = '0px'
          style.left = '45px'
          break
        case 'bottomRight':
          style.top = '0px'
          style.right = `45px`
          break
        case 'left':
          style.left = `${popoverWidth - 30}px`
          style.top = `${(popoverHeight / 2) - 15}px`
          break
        case 'right':
          style.left = '0px'
          style.top = `${(popoverHeight / 2) - 15}px`
          break
        default:
          break
      }
      style.transform = 'rotate(45deg)'
      return style
    },
    wrapper () {
      return styles.wrapper
    },
    maskStyle () {
      return styles.gCover
    },
    uPopoverInnerstyle () {
      return styles.uPopoverInner
    }
  },
  methods: {
    select (index) {
      this.$emit('select', index)
      this.close()
    },
    close () {
      if (this.show) {
        this.show = false
        this.showIn = false
        this.refIsGet = false
        this.$emit('close', this.show)
      }
    },
    wxcPopoverShow () {
      const vm = this
      this.show = true
      this.showIn = true
      this.$nextTick(() => {
        vm.refIsGet = true
        domModule.getComponentRect(this.$refs.target, option => {
          this.size = option.size
          this.position.x = this.size.left
          this.position.y = this.size.top
        })
        domModule.getComponentRect(this.$refs.popover, option => {
          this.popoverMessage = option.size
        })
      })
    },
    hideAction () {
      this.show = false
      this.showIn = false
      this.refIsGet = false
    }
  },
  created () {},
  mounted () {}
}
</script>

<style scoped>
</style>
