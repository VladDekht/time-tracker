import {
    LOGIN_REQUEST,
    LOGIN_RESPONSE,
    LOGIN_FAIL_RESPONSE,
    LOG_OUT,
    REGISTER_REQUEST,
    GET_USER_REQUEST,
    GET_USER_RESPONSE,
    GET_USER_FAIL_RESPONSE,
 } from '../actions/userActions';

const initialState = {
    user: {},
    isLoading: false,
    error: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                user: {},
                isLoading: true,
                error: '',
            });
        case LOGIN_RESPONSE:
            return Object.assign({}, state, {
                user: action.payload,
                isLoading: false,
                error: '',
            });
        case LOGIN_FAIL_RESPONSE:
            return Object.assign({}, state, {
                user: {},
                isLoading: false,
                error: action.payload,
            });
        case LOG_OUT:
            return initialState;
        case REGISTER_REQUEST:
            return Object.assign({}, state, {
                user: {},
                isLoading: true,
                error: '',
            });
        case GET_USER_REQUEST:
            return Object.assign({}, state, {
                user: {},
                isLoading: true,
                error: '',
            });
        case GET_USER_RESPONSE:
            return Object.assign({}, state, {
                user: action.payload,
                isLoading: false,
                error: '',
            });
        case GET_USER_FAIL_RESPONSE:
            return Object.assign({}, state, {
                user: {},
                isLoading: false,
                error: action.payload,
            });
        default:
            return state;
    }
};
