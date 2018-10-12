import { database } from '../Firebase';

export const GET_LOGS = 'GET_LOGS';
//export const GET_LOG = 'GET_LOG';


export const getLogs = () => {
    return dispatch => {
        database.orderByChild('user').equalTo(localStorage.getItem('userEmail')).on('value', data => {
            dispatch({
                type: GET_LOGS,
                payload: data.val()
            })
        })
    }
}

export const setLog = (log) => {
    return dispatch => database.push(log);
}

/*export const getLog = date => {
    return dispatch => {
        database.orderByChild('date').equalTo(date).on('value', data => {
            dispatch({
                type: GET_LOG,
                payload: data.val()
            })
        })
    }
}*/