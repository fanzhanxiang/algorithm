import varibles from '../../style/themes/default'
const grid = 8
export default {
  wrapRadio: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative'
  },
  textStyle: {
    position: 'absolute',
    left: 80
  },
  radioNotSelected: {
    width: varibles.icon_size_lg,
    height: varibles.icon_size_lg
  },
  radioDisable: {
    color: `${varibles.color_text_disabled}`,
    fontSize: varibles.font_size_heading * 2
  },
  radioSelected: {
    width: varibles.icon_size_lg,
    height: varibles.icon_size_lg
  },
  icon: {
    fontFamily: 'iconfont',
    color: '#108ee9'
  },
  iconDisable: {
    fontFamily: 'iconfont',
    color: varibles.fill_disabled
  },
  umListItemActive: {
    width: 750,
    flexDirection: 'row',
    paddingLeft: 4 * grid,
    backgroundColor: varibles.fill_tap,
    alignItems: 'center'
  },
  umListItem: {
    width: 750,
    flexDirection: 'row',
    paddingLeft: 4 * grid,
    backgroundColor: varibles.fill_base,
    alignItems: 'center'
  },
  umListHeader: {
    width: 750,
    paddingTop: 4 * grid,
    paddingRight: 4 * grid,
    paddingBottom: 2 * grid,
    paddingLeft: 4 * grid
  },
  umListHeaderText: {
    fontSize: varibles.font_size_base * 2,
    color: varibles.color_text_caption
  },
  umListFooter: {
    width: 750,
    paddingTop: 4 * grid,
    paddingRight: 4 * grid,
    paddingBottom: 2 * grid,
    paddingLeft: 4 * grid
  },
  umListFooterText: {
    fontSize: varibles.font_size_base * 2,
    color: varibles.color_text_caption
  },
  umListBody: {
    backgroundColor: varibles.fill_base,
    borderTopWidth: varibles.border_width_md,
    borderTopColor: varibles.border_color_base,
    borderBottomWidth: varibles.border_width_md,
    borderBottomColor: varibles.border_color_base
  },
  umListItemThumb: {
    marginRight: 2 * grid,
    marginLeft: 2 * grid
  },
  umListItemThumbImg: {
    width: 5 * grid,
    height: 5 * grid
  },
  umListItemLine: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 4 * grid,
    paddingTop: 2 * grid,
    paddingBottom: 2 * grid,
    borderBottomWidth: varibles.border_width_md,
    borderBottomColor: varibles.border_color_base
  },
  umListItemLinetop: {
    alignItems: 'flex-start'
  },
  umListItemLinemiddle: {
    alignItems: 'center'
  },
  umListItemLinebottom: {
    alignItems: 'flex-end'
  },
  umListItemContent: {
    flex: 1
  },
  umListItemContentText: {
    color: varibles.color_text_base,
    fontSize: varibles.font_size_heading * 2,
    textAlign: 'left',
    textOverflow: 'ellipsis',
    lines: 1
  },
  umListItemContentTextWrap: {
    color: varibles.color_text_base,
    fontSize: varibles.font_size_heading * 2,
    textAlign: 'left'
  },
  umListItemExtra: {
    alignItems: 'flex-end',
    width: 270
  },
  umListItemExtraText: {
    color: varibles.color_text_caption,
    fontSize: varibles.font_size_caption * 2,
    textAlign: 'right'
  },
  umListItemArrow: {
    marginLeft: 2 * grid,
    visibility: 'hidden'
  },
  umListItemArrowhorizontal: {
    visibility: 'visible'
  },
  umListItemArrowdown: {
    visibility: 'visible',
    transform: 'rotate(90deg)'
  },
  umListItemArrowup: {
    visibility: 'visible',
    transform: 'rotate(270deg)'
  },
  umListItemArrowIcon: {
    fontFamily: 'iconfont',
    fontSize: varibles.icon_size_xxs * 2,
    color: varibles.color_icon_base
  },
  umListItemBrief: {
    marginTop: 2 * grid
  },
  umListItemBriefText: {
    color: varibles.color_text_caption,
    fontSize: varibles.font_size_subhead * 2
  },
  disableTitle: {
    color: varibles.fill_disabled
  }
}
