import initialState from './initialState';
import { REHYDRATE } from 'redux-persist/constants';

export default function(state = initialState.rehydrated, action) {
    switch (action.type) {
        case REHYDRATE:
            return true;
        default:
            return state;
    }
}
