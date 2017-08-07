import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import todoNav from './todoNav'
import todoRoute from './todoRoute'

// const todoApp = combineReducers({
//   todos,
//   visibilityFilter,
//   todoNav,
//   // todoRoute
// })

export default {
  todos,
  visibilityFilter,
  todoNav
}
