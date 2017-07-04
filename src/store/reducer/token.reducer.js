import initialState from '../initialState';
import * as types from './actionTypes';

export default function(state = initialState.token, action) {
    switch (action.type) {
        case types.AUTH_SUCCESS:
            return action.token;
        case types.AUTH_ERROR:
            return null;
        default:
            return state;
    }
}
