import { SET_LANGUAGE } from './constants';

export const setLanguage = id => ({
    type: SET_LANGUAGE,
    payload: id,
});
