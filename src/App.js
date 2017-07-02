import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Router from './components/Router';
import configureStore from './store';
import { client } from './store/reducer';

// Do not include devtool in real api
const DevTools = process.env.NODE_ENV === 'development'
    ? require('./store/DevTools').default
    : () => null;

const store = configureStore();

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client} store={store}>
                <BrowserRouter>
                    <div>
                        <Router />
                        <DevTools />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
