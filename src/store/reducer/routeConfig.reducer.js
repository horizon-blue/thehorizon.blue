import initialState from './initialState';
import * as types from './actionTypes';

export default function(state = initialState.routeConfig, action) {
    switch (action.type) {
        case types.UPDATE_ROUTE_CONFIG:
            return action.routeConfig;
        default:
            return state;
    }
}
