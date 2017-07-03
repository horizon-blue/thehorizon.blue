import { combineReducers } from 'redux';
import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo';

import auth from './auth.reducer';

// setup apollo
const networkInterface = createBatchingNetworkInterface({
    uri: process.env.API_SERVER === 'test'
        ? 'http://localhost:2333/batch'
        : 'https://api.thehorizon.blue/batch',
});

// // for debugging purpose only
// const loggingAfterware = {
//     applyBatchAfterware(res, next) {
//         console.log(res.responses);
//         next();
//     },
// };

const responseTransformAfterware = {
    applyBatchAfterware(res, next) {
        if (!res || !res.responses) next();
        const responses = res.responses.map((r, i) => {
            return { id: i, ...r.payload, status: r.status };
        });
        res.responses = responses;
        next();
    },
};

networkInterface.useAfter([responseTransformAfterware]);

export const client = new ApolloClient({
    networkInterface,
});

const rootReducer = combineReducers({
    auth,
    apollo: client.reducer(),
});

export default rootReducer;
