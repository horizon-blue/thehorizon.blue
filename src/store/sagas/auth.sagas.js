import { put, takeLatest, fork } from 'redux-saga/effects';
import { gql } from 'react-apollo';
import * as types from '../reducer/actionTypes';
import client from '../../apolloClient';

const createToken = gql`
    mutation createToken($name: String!, $password: String!) {
        createToken(name: $name, password: $password) {
            token
            success
        }
    }
`;

// Log in Saga
export function* resolveloginRequest(action) {
    const { name, password, onLoginComplete } = action;
    try {
        const res = yield client.networkInterface.query({
            query: createToken,
            variables: { name, password },
        });
        const { success, token } = res.data.createToken;
        if (success) {
            client.resetStore();
            onLoginComplete && onLoginComplete();
            yield put({ type: types.AUTH_SUCCESS, token: token });
        } else {
            onLoginComplete && onLoginComplete('身份验证失败。');
            yield put({ type: types.AUTH_ERROR });
        }
    } catch (e) {
        console.log(action.type, e);
        onLoginComplete && onLoginComplete(e.message);
        yield put({ type: types.AUTH_ERROR });
    }
}

function* watchLoginRequest() {
    yield takeLatest(types.LOGIN_REQUEST, resolveloginRequest);
}

// do a cache clear up after log out
export function* resolvelogoutRequest(action) {
    yield client.resetStore();
}

function* watchLogoutRequest() {
    yield takeLatest(types.LOGOUT_REQUEST, resolvelogoutRequest);
}

export default function* authRootSaga() {
    yield fork(watchLoginRequest);
    yield fork(watchLogoutRequest);
}
