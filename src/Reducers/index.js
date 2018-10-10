import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import DateReducer from './DateReducer';
import moment from 'moment';

export const initialState = {
    dateContext: moment()
}

const rootReducer = combineReducers({
    DateReducer,
    user: UserReducer
})

export default rootReducer;