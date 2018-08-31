import { GET_LAZY } from './constants';

const INITIAL_STATE = {
    test: 123,
};

export default (state = INITIAL_STATE, action: { type: string }) => {
    switch (action.type) {
        case GET_LAZY:
            return { ...state, test: 456 };
        default:
            return state;
    }
};
