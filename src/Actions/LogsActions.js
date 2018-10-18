import { database} from '../Firebase';
import * as firebase from "firebase";

export const GET_LOGS = 'GET_LOGS';

export const getLogs = () => {
    return dispatch => {
        if (sessionStorage.getItem('userEmail')) {
            database.orderByChild('user').equalTo(sessionStorage.getItem('userEmail')).on('value', data => {
                let payload = (data.val() === null ? -1 : data.val())
                dispatch({
                    type: GET_LOGS,
                    payload: payload
                })
            })
        }

    }
}

export const setLog = (log) => {
    log.user = sessionStorage.getItem('userEmail');
    let keys = [];
    database.orderByChild('user').equalTo(log.user).on('value', function (snapshot) {
        snapshot.forEach(data => {
            if (data !== null && String(data.val().date).localeCompare(log.date) === 0) {
                keys.push(data.key)
            }
        });
    });
    if (keys.length > 0) {
        let keysToRemove = keys.slice(1);
        if (keysToRemove.length > 0) {
            keysToRemove.forEach(key => {
                firebase.database().ref('logs/' + key).remove();
            })
        }
        return dispatch => database.update({ [keys[0]]: log })
    }
    else {
        return dispatch => database.push(log)
    }
}