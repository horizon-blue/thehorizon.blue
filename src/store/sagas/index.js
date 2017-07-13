import { fork } from 'redux-saga/effects';
import auth from './auth.sagas';
import actionListener from './actionListener.sagas';

export default function* rootSaga() {
    yield fork(auth);
    yield fork(actionListener);
}
