import {
    FETCH_MATCH_DATA_REQUESTED,
    FETCH_MATCH_DATA_FINISHED,
} from '../components/LiveMatch/constants';

const INITIAL_STATE = {
    liveMatch: true,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_MATCH_DATA_REQUESTED:
            return { ...state, liveMatch: true };
        case FETCH_MATCH_DATA_FINISHED:
            return { ...state, liveMatch: false };
        default:
            return state;
    }
};
