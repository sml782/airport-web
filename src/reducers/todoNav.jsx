import { CHANGE_NAVLEFT, CHANGE_NAVRIGHT } from '../constants/NavbarTypes'

const initState = { 
    leftText: 'app', 
    rightText: 'app',
}

const todoNav = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_NAVLEFT:
            return {
                leftText: action.leftText
            }
        case CHANGE_NAVRIGHT:
            return {
                leftText: action.rightText
            }
    }
}

export default todoNav