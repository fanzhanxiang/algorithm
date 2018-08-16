import varibles from '../../style/themes/default'
const grid = 8
export default {
  containerDisabled: {
    backgroundColor: varibles.fill_base,
    color: varibles.fill_base
  },
  containerActive: {
    backgroundColor: varibles.fill_tap
  },
  textDisabled: {
    color: varibles.color_text_disabled
  },
  wrapper: {
    zIndex: varibles.popup_zindex
  },
  gCover: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: varibles.fill_mask,
    zIndex: 1
  },
  gPopover: {
    position: 'fixed',
    padding: `${1.875 * grid}px`,
    zIndex: 10
  },
  uPopoverArrow: {
    position: 'absolute',
    borderRadius: `${0.5 * grid}px`,
    width: `${3.75 * grid}px`,
    height: `${3.75 * grid}px`,
    backgroundColor: varibles.fill_base
  },
  uPopoverInner: {
    borderRadius: `${1.25 * grid}px`,
    backgroundColor: varibles.fill_base
  },
  popoverItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: `${2.5 * grid}px`,
    marginRight: `${2.5 * grid}px`,
    paddingLeft: `${2.5 * grid}px`,
    paddingRight: `${2.5 * grid}px`,
    borderBottomWidth: 1,
    borderBottomColor: varibles.fill_tap,
    height: `${11.25 * grid}px`,
    backgroundColor: varibles.fill_base
  },
  popoverItemIcon: {
    flexDirection: 'row',
    width: `${7.5 * grid}`,
    height: `${11.25 * grid}`,
    alignItems: 'center',
    marginRight: `${2 * grid}px`
  },
  popoverItemContent: {
    flexDirection: 'row',
    height: `${11.25 * grid}`,
    alignItems: 'center',
    paddingLeft: `${2.5 * grid}px`
  },
  iconStyle: {
    fontFamily: 'iconfont',
    color: '#000',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: `${varibles.font_size_head * 2}px`,
    alignItems: 'center'
  }
}
