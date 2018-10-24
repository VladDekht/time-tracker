/* eslint-disable indent */
import { database } from '../firebase';
import { getUser } from './userActions';

export const GET_LOGS_LIST_REQUEST = 'GET_LOGS_LIST_REQUEST';
export const GET_LOGS_LIST_RESPONSE = 'GET_LOGS_LIST_RESPONSE';
export const GET_LOGS_LIST_FAIL_RESPONSE = 'GET_LOGS_LIST_FAIL_RESPONSE';
export const POST_LOG_REQUEST = 'POST_LOG_REQUEST';
export const POST_LOG_RESPONSE = 'POST_LOG_REQUEST';
export const POST_LOG_FAIL_RESPONSE = 'POST_LOG_FAIL_RESPONSE';

const getLogsListRequest = () => ({
    type: GET_LOGS_LIST_REQUEST,
});

const getLogsListResponse = data => ({
    type: GET_LOGS_LIST_RESPONSE,
    payload: data,
});

const getLogsListFailResponse = error => ({
    type: GET_LOGS_LIST_FAIL_RESPONSE,
    payload: error,
});

const postLogRequest = () => ({
    type: POST_LOG_REQUEST,
});

const postLogResponse = data => ({
    type: POST_LOG_RESPONSE,
    payload: data,
});

const postLogFailResponse = error => ({
    type: POST_LOG_FAIL_RESPONSE,
    payload: error,
});

export const getLogsList = () => async (dispatch, getState) => {
    dispatch(getLogsListRequest());
    dispatch(getUser()).then(() => {
        const state = getState();
        const { user } = state.user;
        try {
            database
                .orderByChild('user')
                .equalTo(user.email)
                .on('value', (data) => {
                    if (data.val()) {
                        dispatch(getLogsListResponse(data.val()));
                    } else {
                        dispatch(getLogsListResponse(-1));
                    }
                });
        } catch (error) {
            dispatch(getLogsListFailResponse(error));
        }
    });
};

export const setLog = log => async (dispatch, getState) => {
    dispatch(getUser()).then(dispatch(postLogRequest())).then(() => {
        const state = getState();
        const { user } = state.user;
        Object.assign(log, { user: user.email });
        let keyToUpdate = '';
        database.orderByChild('user').equalTo(user.email)
        .on('value', (snapshot) => {
            snapshot.forEach((data) => {
                if (data.val().date.localeCompare(log.date) === 0) {
                    keyToUpdate = data.key;
                }
            });
        });
        return keyToUpdate;
    })
        .then((key) => {
            if (key) {
                database.update({ [key]: log })
                    .then(dispatch(postLogResponse({ [key]: log })))
                    .catch(error => dispatch(postLogFailResponse(error)));
            } else {
                const newKey = database.push().key;
                database.child(newKey).set(log)
                    .then(dispatch(postLogResponse({ [newKey]: log })))
                    .catch(error => dispatch(postLogFailResponse(error)));
            }
        });
};
