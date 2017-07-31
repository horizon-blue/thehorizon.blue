import { combineReducers } from 'redux';
import token from './token.reducer';
import routeConfig from './routeConfig.reducer';
import rehydrated from './rehydrated.reducer';
import draft from './draft.reducer';
import status from './status.reducer';
import client from '../../apolloClient';

const rootReducer = combineReducers({
    token,
    routeConfig,
    rehydrated,
    draft,
    status,
    apollo: client.reducer(),
});

export default rootReducer;
