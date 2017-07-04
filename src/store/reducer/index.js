import { combineReducers } from 'redux';
import auth from './auth.reducer';
import client from '../../apolloClient';

const rootReducer = combineReducers({
    auth,
    apollo: client.reducer(),
});

export default rootReducer;
