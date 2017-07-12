import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import initialState from './reducer/initialState';
import client, { applyAuthMiddleWare } from '../apolloClient';

const sagaMiddleware = createSagaMiddleware();

let middleware = [client.middleware(), sagaMiddleware];

// Add additional middlewares for dev
if (process.env.NODE_ENV === 'development') {
    const reduxImmutableStateInvariant = require(
        'redux-immutable-state-invariant'
    ).default();
    middleware = [...middleware, reduxImmutableStateInvariant];
}

let enhancer = [applyMiddleware(...middleware), autoRehydrate()];

// Add additional enhancers for dev
if (process.env.NODE_ENV === 'development') {
    const DevTools = require('./DevTools').default;
    enhancer = [...enhancer, DevTools.instrument()];
}

function configureStore() {
    const store = createStore(rootReducer, initialState, compose(...enhancer));
    persistStore(store, {
        whitelist: ['token', 'draft'],
    });
    applyAuthMiddleWare(store);

    store.runSaga = sagaMiddleware.run;

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducer', () =>
            store.replaceReducer(require('./reducer').default)
        );
    }
    return store;
}

export default configureStore;
