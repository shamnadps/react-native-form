import * as types from './constants.js';

export const addUser = ({ user }) => {
    return { type: types.ADD_USER, payLoad: user };
};


