import initialState from './initialState';
import * as types from 'actionTypes';

export default function(state = initialState.status, action) {
    switch (action.type) {
        default:
            return state;
    }
}
