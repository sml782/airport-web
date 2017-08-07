import { CHANGE_ROUTE } from '../constants/RouteTypes'

const initState = {
    pathname:'/',
    query:undefined
}
const todoRoute = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_ROUTE:
            return {
                pathname: action.pathname,
                query: action.query
            }
        default :
            return initState
    }
}

export default todoRoute