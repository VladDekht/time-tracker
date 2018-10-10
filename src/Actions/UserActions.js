import {auth} from '../Firebase';

export const GET_USER = 'GET_USER';

export function getUser() {
    return dispatch => {
        auth.onStateChanged(user => {
            dispatch({
                type: GET_USER,
                payload : user
            })
        })
    }
}