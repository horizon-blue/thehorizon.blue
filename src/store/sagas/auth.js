import { call, put, takeLatest, fork, race } from 'redux-saga/effects';
import * as types from '../reducer/actionTypes';
import client from '../../apolloClient';

// Log in Saga
export function* resolveloginRequest(action) {
    let { username, password } = action.data;

    // // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
    // // lead to a race condition. This is unlikely, but just in case, we call `race` which
    // // returns the "winner", i.e. the one that finished first
    // let winner = yield race({
    //     auth: call(authorize, { username, password, isRegistering: false }),
    //     logout: take(LOGOUT),
    // });

    // // If `authorize` was the winner...
    // if (winner.auth) {
    //     // ...we send Redux appropiate actions
    //     yield put({ type: SET_AUTH, newAuthState: true }); // User is logged in (authorized)
    //     yield put({
    //         type: CHANGE_FORM,
    //         newFormState: { username: '', password: '' },
    //     }); // Clear form
    //     forwardTo('/dashboard'); // Go to dashboard page
    // }
}

function* watchLoginRequest() {
    yield takeLatest(types.LOGIN_REQUEST, resolveloginRequest);
}

export default function* authRootSaga() {
    yield fork(watchLoginRequest);
}
