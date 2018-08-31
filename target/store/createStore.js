"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var redux_1 = require("redux");
var redux_saga_1 = require("redux-saga");
var redux_logger_1 = require("redux-logger");
var why_did_you_update_1 = require("why-did-you-update");
var reducers_1 = require("./reducers");
var saga_1 = require("./saga");
why_did_you_update_1.whyDidYouUpdate(React);
var logger = redux_logger_1.createLogger({});
var sagaMiddleware = redux_saga_1.default();
// const createStoreWithMiddleware = applyMiddleware(logger, sagaMiddleware)(
//     createStore
// );
var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga_1.default);
exports.default = store;
//# sourceMappingURL=createStore.js.map