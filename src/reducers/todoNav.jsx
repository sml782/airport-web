import { CHANGE_NAVTITLE, CHANGE_NAVLEFT, CHANGE_NAVRIGHT, CHANGE_NAV } from '../constants/NavbarTypes'

const initState = { 
    title:'app',
    left:{
        text:'←',
        func:undefined
    },
    right:{
        text:'...',
        func:undefined
    }
}
const todoNav = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAVTITLE:
            state.title = action.title;
            return state
        case CHANGE_NAVLEFT:
            state.left.text = action.left.text;
            state.left.func = action.left.func;
            return state
        case CHANGE_NAVRIGHT:
            state.right.text = action.right.text;
            state.right.func = action.right.func;
            return state
        default :
            return state
    }
}

export default todoNav;