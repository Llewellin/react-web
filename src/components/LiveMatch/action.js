import { FETCH_MATCH_DATA, PLACE_BET } from './constants';

export const fetchMatchData = () => ({
    type: FETCH_MATCH_DATA,
});
export const placeBet = id => ({
    type: PLACE_BET,
    payload: id,
});
