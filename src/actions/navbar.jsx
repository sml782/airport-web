import * as typesNav from '../constants/NavbarTypes'
export const changeLeft = (text) => ({
  type: typesNav.CHANGE_NAVLEFT,
  leftText:text
})

export const changeRight = (text) => ({
  type: typesNav.CHANGE_NAVRIGHT,
  right:text
})