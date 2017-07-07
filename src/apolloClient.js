import { ApolloClient, createBatchingNetworkInterface } from 'react-apollo';

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

// For compatibility with graphene response format
const responseTransformAfterware = {
    applyBatchAfterware(res, next) {
        if (!res || !res.responses) next();
        res.responses = res.responses.map((r, i) => {
            return { id: i, ...r.payload, status: r.status };
        });
        next();
    },
};

networkInterface.useAfter([responseTransformAfterware]);

export function applyAuthMiddleWare(store) {
    // sent the token
    const authMiddleware = {
        applyBatchMiddleware(req, next) {
            if (!req.options.headers) {
                req.options.headers = {}; // Create the headers object if needed.
            }
            const { token } = store.getState();
            if (token) {
                req.options.headers['Authorization'] = 'Bearer ' + token;
            }
            next();
        },
    };
    networkInterface.use([authMiddleware]);
}

export default new ApolloClient({
    networkInterface,
});
