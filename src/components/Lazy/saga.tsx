import { takeLatest, fork, call } from 'redux-saga/effects';

import { getLazy } from './api';
import { GET_LAZY } from './constants';

function* getLazySaga(): any {
    const response = yield call(getLazy);
    console.log('response = ', response);
}

export default function*(): any {
    yield takeLatest(GET_LAZY, getLazySaga);
}
