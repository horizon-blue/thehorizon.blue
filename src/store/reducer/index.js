import { combineReducers } from 'redux';
import token from './token.reducer';
import client from '../../apolloClient';

const rootReducer = combineReducers({
    token,
    apollo: client.reducer(),
});

export default rootReducer;
