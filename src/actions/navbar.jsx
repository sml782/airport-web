import * as typesNav from '../constants/NavbarTypes'

export const changeNav = (title,left,right) => ({
  type: typesNav.CHANGE_NAV,
  title,
  left,
  right
})
// export const changeLeft = (text,func) => ({
//   type: typesNav.CHANGE_NAVLEFT,
//   text,
//   func: func ? func : undefined
// })
// export const changeRight = (text,func) => ({
//   type: typesNav.CHANGE_NAVRIGHT,
//   text,
//   func
// })