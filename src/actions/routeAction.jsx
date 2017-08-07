import * as routeType from '../constants/RouteTypes'

export const changeRoute = (pathname,query) => ({
  type: routeType.CHANGE_ROUTE,
  pathname,
  query
})