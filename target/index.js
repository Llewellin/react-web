"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var App_1 = require("./components/App/App");
var createStore_1 = require("./store/createStore");
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: createStore_1.default },
    React.createElement(App_1.default, null)), document.getElementById('index'));
//# sourceMappingURL=index.js.map