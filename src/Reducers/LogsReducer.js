import {
    GET_LOGS_LIST_REQUEST,
    GET_LOGS_LIST_RESPONSE,
    GET_LOGS_LIST_FAIL_RESPONSE,
    POST_LOG_REQUEST,
    POST_LOG_RESPONSE,
    POST_LOG_FAIL_RESPONSE,
 } from '../Actions/logsActions';

const initialState = {
    logsList: [],
    isLoading: false,
    error: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_LOGS_LIST_REQUEST:
            return Object.assign({}, state, {
                logsList: [],
                isLoading: true,
                error: '',
            });
        case GET_LOGS_LIST_RESPONSE:
            return Object.assign({}, state, {
                logsList: action.payload,
                isLoading: false,
                error: '',
            });
        case GET_LOGS_LIST_FAIL_RESPONSE:
            return Object.assign({}, state, {
                logsList: [],
                isLoading: false,
                error: action.payload,
            });
        case POST_LOG_REQUEST:
            return Object.assign({}, state, {
                isLoading: false,
                error: '',
            });
        case POST_LOG_RESPONSE:
            return Object.assign({}, state, {
                logsList: [...state.logsList, action.payload],
                isLoading: false,
                error: '',
            });
        case POST_LOG_FAIL_RESPONSE:
            return Object.assign({}, state, {
                logsList: state.logsList,
                isLoading: false,
                error: action.payload,
            });
        default:
            return state;
    }
}
