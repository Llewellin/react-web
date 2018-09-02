import { combineReducers } from 'redux';

import config from '../services/config/reducer';
import lang from '../services/lang/reducer';
import loading from './loadingReducer';
import liveMatch from '../components/liveMatch/reducer';

const rootReducer = combineReducers({
    config,
    lang,
    loading,
    liveMatch,
});

export default rootReducer;
