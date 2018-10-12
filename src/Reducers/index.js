import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import LogsReducer from './LogsReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    form: formReducer,
    logs: LogsReducer,
    user: UserReducer
})

export default rootReducer;