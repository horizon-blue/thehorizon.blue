import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import FastClick from 'fastclick';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

import Router from './components/Router';
import configureStore from './store';
import rootSaga from './store/sagas';
import client from './apolloClient';

// Do not include devtool in real api
const DevTools = process.env.NODE_ENV === 'development'
    ? require('./store/DevTools').default
    : () => null;

const store = configureStore();
store.runSaga(rootSaga);

window.addEventListener('load', () => {
    FastClick.attach(document.body);
});

class App extends PureComponent {
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

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
