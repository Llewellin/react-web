import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './components/App/App.tsx';
import store from './store/createStore';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('index')
);
