import { combineReducers } from 'redux';
import * as types from './reducer/constants';

const initialState = {
    user: {}
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return {
                ...state,
                user: action.payLoad
            };
        default:
            return state;
    }
};

export default mainReducer;