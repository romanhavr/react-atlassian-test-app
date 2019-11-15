// @flow

import { call, put, takeEvery } from 'redux-saga/effects';
import type { User } from '../interfaces/interfaces';

function* fetchUser(): Generator<User[], void, User[]> {
   try {
      const users: User[] = yield call(() => asyncData('User Info'));
      // yield call(asyncData('qwe'));          // for Fetch Faile
      yield put({type: "USER_FETCH_SUCCEEDED", payload: { status: 'Fetch Succeeded payload', users}});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* asyncData(userInfo: string) {
   const users = yield fetch('http://www.mocky.io/v2/5dcd1b782e00007c00729ac9').then( res => res.json())
   yield put({ type: 'ASYNC_TYPE', userInfo})
   return users
}

function* mySaga(): Generator<any, void, void> {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;