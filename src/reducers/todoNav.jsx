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
        case CHANGE_NAV:
            if(action.title){
                state.title = action.title;
            }
            if(action.left){
                state.left.text = action.left.text;
                state.left.func = action.left.func;
            }
            if(action.right){
                state.right.text = action.right.text;
                state.right.func = action.right.func;
            }
            return state
        default :
            return state
    }
}

export default todoNav;