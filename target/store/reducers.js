"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducer_1 = require("../components/Lazy/reducer");
var rootReducer = redux_1.combineReducers({
    lazy: reducer_1.default,
});
exports.default = rootReducer;
//# sourceMappingURL=reducers.js.map