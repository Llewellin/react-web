import lang from '../../properties/lang';
import { SET_LANGUAGE } from './constants';

const INITIAL_STATE = lang[Object.keys(lang)[0]];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            return { ...state, ...lang[action.payload] };
        default:
            return state;
    }
};
