import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { whyDidYouUpdate } from 'why-did-you-update';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import reducers from './reducers';
import saga from './saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['liveMatch'],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware];
if (process.env.BUILD_VARIANT === 'dev') {
    whyDidYouUpdate(React);

    middlewares = [logger, ...middlewares];
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(saga);
const persistor = persistStore(store);

export { persistor, store };
