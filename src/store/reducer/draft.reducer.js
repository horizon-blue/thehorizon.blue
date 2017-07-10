import initialState from './initialState';
import * as types from './actionTypes';

export default function(state = initialState.draft, action) {
    switch (action.type) {
        case types.SAVE_DRAFT:
            return action.draft;
        default:
            return state;
    }
}
