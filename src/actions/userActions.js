import { auth } from '../firebase';

export const GET_USER = 'GET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_RESPONSE = 'GET_USER_RESPONSE';
export const GET_USER_FAIL_RESPONSE = 'GET_USER_FAIL_RESPONSE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGIN_FAIL_RESPONSE = 'LOGIN_FAIL_RESPONSE';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';

export const getUserRequest = () => ({
    type: GET_USER_REQUEST,
});

export const getUserResponse = data => ({
    type: GET_USER_RESPONSE,
    payload: data,
});

export const getUserFailResponse = error => ({
    type: GET_USER_FAIL_RESPONSE,
    payload: error,
});

export const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

export const loginResponse = data => ({
    type: LOGIN_RESPONSE,
    payload: data,
});

export const loginFailResponse = error => ({
    type: LOGIN_FAIL_RESPONSE,
    payload: error,
});

export const logOut = () => ({
    type: LOG_OUT,
});

export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const getUser = () => async (dispatch) => {
    dispatch(getUserRequest());

    const user = auth.currentUser;
    if (user) {
        dispatch(getUserResponse(user));
    } else {
        dispatch(getUserFailResponse('Authentication error'));
    }
};

export const login = (email, password) => async (dispatch) => {
    dispatch(loginRequest());
    auth.signInWithEmailAndPassword(email, password).then((response) => {
        if (response) {
            dispatch(loginResponse(response.user));
        }
    }).catch(err => loginFailResponse(err.message));
    return auth.signInWithEmailAndPassword(email, password);
};

export const register = (email, password) => async (dispatch) => {
    dispatch(registerRequest());
    auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
        if (response) {
            dispatch(loginResponse(response.user));
        }
    }).catch(err => loginFailResponse(err.message));
    return auth.createUserWithEmailAndPassword(email, password);
}

export const logout = () => async (dispatch) => {
    dispatch(logOut());
    return auth.signOut();
}