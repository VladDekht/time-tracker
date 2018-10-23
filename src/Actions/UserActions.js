import { auth } from './../firebase';
export const GET_USER = 'GET_USER';

export function getUser() {
    return dispatch => {
        auth.onAuthStateChanged(user => {
            dispatch({
                type: GET_USER,
                payload: user
            })
        })
    }
}

export function login (email, password) {
    return dispatch => auth.signInWithEmailAndPassword(email,password);
}

export function register(email,password){
    return dispatch => auth.createUserWithEmailAndPassword(email,password);
}

export function logout() {
    return dispatch => auth.signOut();
}