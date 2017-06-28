import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import classnames from 'classnames';
import Router from './Router';
import Header from './components/Header';
import {
    ApolloClient,
    ApolloProvider,
    createNetworkInterface,
} from 'react-apollo';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: process.env.USE_TEST_SERVER
            ? 'http://localhost:2333'
            : 'https://api.thehorizon.blue/graphql',
    }),
});

class App extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <div className={classnames('App', className)} {...props}>
                        <Header />
                        <Router />
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
