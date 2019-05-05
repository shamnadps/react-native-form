import { combineReducers } from 'redux';
import * as types from './reducer/constants';

const initialState = {
    user: { name: 'admin', password: 'admin' },
    consent: {}
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return {
                ...state,
                user: action.payLoad
            };
        case types.UPDATE_CONSENT:
            return {
                ...state,
                consent: action.payLoad
            };
        default:
            return state;
    }
};

export default mainReducer;