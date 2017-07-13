import { put, takeLatest, fork, take } from 'redux-saga/effects';
import * as types from '../reducer/actionTypes';

function* resolveActionSubscription(action) {
    const { subscribe, callback } = action;
    while (true) {
        yield take(subscribe);
        if (callback && typeof callback === 'function') callback();
        yield put({ type: types.ACTION_RESOLVE });
    }
}

function* watchActionsSubscription() {
    yield takeLatest(types.SUBSCRIBE_ACTION, resolveActionSubscription);
}

export default function* actionListenerRootSaga() {
    yield fork(watchActionsSubscription);
}
