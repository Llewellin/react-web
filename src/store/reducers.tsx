import { combineReducers } from 'redux';

import lazy from '../components/Lazy/reducer';

const rootReducer = combineReducers({
    lazy,
});

export default rootReducer;
