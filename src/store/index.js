import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer, { client } from './reducer';
import initialState from './initialState';

let middleware = [client.middleware()];

// Add additional middlewares for dev
if (process.env.NODE_ENV === 'development') {
    middleware = [...middleware];
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
        whitelist: ['auth'],
    });

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept('./reducer', () =>
            store.replaceReducer(
                require('./reducer') /*.default if you use Babel 6+ */
            )
        );
    }
    return store;
}

export default configureStore;
