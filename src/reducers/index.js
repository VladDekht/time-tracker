import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import logsReducer from './logsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    form: formReducer,
    logs: logsReducer,
    user: userReducer,
});

export default rootReducer;
