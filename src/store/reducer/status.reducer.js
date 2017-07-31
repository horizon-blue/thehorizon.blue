import initialState from './initialState';
import * as types from 'actionTypes';

export default function(state = initialState.status, action) {
    switch (action.type) {
        case types.TOGGLE_NAVBAR:
            return { ...state, showNav: !state.showNav };
        default:
            return state;
    }
}
