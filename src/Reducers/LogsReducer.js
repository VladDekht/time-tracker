import {GET_LOGS} from '../Actions/LogsActions';

export default function (state = {}, action) {
    switch (action.type) {
        case GET_LOGS:
            return action.payload;
        default:
            return state;
    }
}