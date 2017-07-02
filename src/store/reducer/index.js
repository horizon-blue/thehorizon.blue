import { combineReducers } from 'redux';
import { ApolloClient, createNetworkInterface } from 'react-apollo';

import auth from './auth.reducer';

export const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: process.env.API_SERVER === 'test'
            ? 'http://localhost:2333/'
            : 'https://api.thehorizon.blue/',
    }),
});

const rootReducer = combineReducers({
    auth,
    apollo: client.reducer(),
});

export default rootReducer;
