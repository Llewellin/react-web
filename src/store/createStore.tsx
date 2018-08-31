import * as React from 'react';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import {whyDidYouUpdate} from 'why-did-you-update';

import reducers from './reducers';
import saga from './saga';

whyDidYouUpdate(React);

const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();
// const createStoreWithMiddleware = applyMiddleware(logger, sagaMiddleware)(
//     createStore
// );
const store = createStore(reducers, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga);

export default store;
