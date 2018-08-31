import { fork } from 'redux-saga/effects';

// import loot from '../components/Loot/saga';
// import wallet from '../components/Wallet/saga';

import lazy from '../components/Lazy/saga';

export default function*(): any {
    // yield fork(loot);
    // yield fork(wallet);
    yield fork(lazy);
}
