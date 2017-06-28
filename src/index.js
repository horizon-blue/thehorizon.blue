import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: process.env.USE_TEST_SERVER
            ? 'http://localhost:2333/graphql'
            : 'https://api.thehorizon.blue/graphql',
    }),
});

ReactDOM.render(
    <ApolloProvider client={client}><App /></ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
