import { GET_USER } from './../Actions/UserActions';

export default (state = {}, action) => {
    console.log('state', state)
    console.log('action', action)

    switch (action.type) {
        case GET_USER :
            return {...state, user: action.payload}
        default:
            return state;
    }
}