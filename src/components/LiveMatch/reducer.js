import {
    FETCH_MATCH_DATA_FULFILLED,
    FETCH_MATCH_DATA_ERROR,
    SAVE_TIME_STAMP_MATCH_DATA,
} from './constants';

const INITIAL_STATE = {
    matchData: {},
    timeStamp: {
        matchData: '',
    },
    errMsg: {
        matchData: '',
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MATCH_DATA_FULFILLED:
            return {
                ...state,
                matchData: action.payload,
                errMsg: {
                    ...state.errMsg,
                    matchData: '',
                },
            };
        case FETCH_MATCH_DATA_ERROR:
            return {
                ...state,
                matchData: INITIAL_STATE.matchData,
                errMsg: { ...state.errMsg, matchData: action.payload },
            };
        case SAVE_TIME_STAMP_MATCH_DATA:
            return {
                ...state,
                timeStamp: { ...state.timeStamp, matchData: action.payload },
            };
        default:
            return state;
    }
};
