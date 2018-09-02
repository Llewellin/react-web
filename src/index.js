// process.env.NODE_CONFIG_DIR = './config';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './components/App/App';
import { store, persistor } from './store/createStore';

// initialize bugsnag ASAP, before other imports
import bugsnag from 'bugsnag-js';
const bugsnagClient = bugsnag('7f1b15a2dfabbe23f0a9768accd95a83');
import createPlugin from 'bugsnag-react';
const ErrorBoundary = bugsnagClient.use(createPlugin(React));

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </ErrorBoundary>,
    document.getElementById('index'),
);
