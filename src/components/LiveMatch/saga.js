import _ from 'lodash';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import moment from 'moment';

import {
    FETCH_MATCH_DATA,
    FETCH_MATCH_DATA_REQUESTED,
    FETCH_MATCH_DATA_FULFILLED,
    FETCH_MATCH_DATA_ERROR,
    FETCH_MATCH_DATA_FINISHED,
    SAVE_TIME_STAMP_MATCH_DATA,
    PLACE_BET,
} from './constants';
import { fetchMatchDataApi } from './api';
import bugsnagClient from '../../services/bugsnag/bugsnag';

const fetchMatchDataSaga = function*() {
    const { lang, config } = yield select(state => state);
    try {
        yield put({ type: FETCH_MATCH_DATA_REQUESTED });
        const { data } = yield call(
            fetchMatchDataApi,
            config.API.FETCH_MATCH_DATA,
        );
        const mappedData = _.keyBy(data.liveEvents, 'event.id');

        yield put({
            type: FETCH_MATCH_DATA_FULFILLED,
            payload: mappedData,
        });
    } catch (err) {
        const errMsg = err.message ? err.message : lang.err_msg.match_data;
        yield put({ type: FETCH_MATCH_DATA_ERROR, payload: errMsg });
        bugsnagClient.notify(
            new Error(`liveMatch -> saga -> fetchMatchDataSaga -> ${err}`),
        );
    } finally {
        yield put({ type: FETCH_MATCH_DATA_FINISHED });
    }
};

const checkTimerInLocalStorage = function*() {
    const lang = yield select(state => state.lang);
    try {
        const { timeStamp } = yield select(state => state.liveMatch);

        // It supports local storage
        if (typeof Storage !== 'undefined') {
            const currentTime = moment();
            const cachedTime = timeStamp.matchData
                ? moment(timeStamp.matchData)
                : timeStamp.matchData;

            // 1. no data in local storage
            // 2. timestamp is before 2 mins
            if (
                cachedTime === '' ||
                (cachedTime && cachedTime.isBefore(currentTime))
            ) {
                // refresh the data
                yield call(fetchMatchDataSaga);
                const futureTime = moment()
                    .add(2, 'minutes')
                    .format();
                yield put({
                    type: SAVE_TIME_STAMP_MATCH_DATA,
                    payload: futureTime.toString(),
                });
            } else {
                // no need to refresh
                yield put({ type: FETCH_MATCH_DATA_FINISHED });
            }
        } else {
            //It doesn't support local storage.
            // Every time when refreshing, update the data
            yield call(fetchMatchDataSaga);
        }
    } catch (err) {
        const errMsg = err.message ? err.message : lang.err_msg.match_data;
        yield put({ type: FETCH_MATCH_DATA_ERROR, payload: errMsg });
        bugsnagClient.notify(
            new Error(
                `liveMatch -> saga -> checkTimerInLocalStorage -> ${err}`,
            ),
        );
    }
};

const fetchMatchDataRecursively = function*() {
    const lang = yield select(state => state.lang);
    try {
        while (true) {
            yield call(checkTimerInLocalStorage);
            yield delay(2 * 60 * 1000);
        }
    } catch (err) {
        const errMsg = err.message ? err.message : lang.err_msg.match_data;
        yield put({ type: FETCH_MATCH_DATA_ERROR, payload: errMsg });
        bugsnagClient.notify(
            new Error(
                `liveMatch -> saga -> fetchMatchDataRecursively -> ${err}`,
            ),
        );
    }
};

const placeBetSaga = function*(action) {
    try {
        const config = yield select(state => state.config);
        window.open(config.BET_URL(action.payload), '_blank');
    } catch (err) {
        bugsnagClient.notify(
            new Error(`liveMatch -> saga -> placeBetSaga -> ${err}`),
        );
    }
};

export default function*() {
    yield takeLatest(FETCH_MATCH_DATA, fetchMatchDataRecursively);
    yield takeLatest(PLACE_BET, placeBetSaga);
}
