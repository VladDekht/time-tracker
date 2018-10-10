import moment from 'moment';


export default (state = {}, action) => {
    console.log('state',state);
    console.log('action',action);
    switch (action.type) {
        case 'SET_MONTH':
            return {...state, dateContext: moment(state.dateContext).set('month', action.month) };
        case 'SET_YEAR':
            return {...state, dateContext: moment(state.dateContext).set('year', action.year) };
        default:
            return state
    }
}