import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import todoNav from './todoNav'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  //todoNav,
})

export default todoApp
