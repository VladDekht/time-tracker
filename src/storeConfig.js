import { createStore } from 'redux';
import dateChanges from './rootReducer';
import moment from 'moment';
import {initialState} from './rootReducer';

export const store = createStore(dateChanges, initialState);