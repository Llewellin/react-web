import { fork } from 'redux-saga/effects';

import liveMatch from '../components/LiveMatch/saga';

export default function*() {
    yield fork(liveMatch);
}
