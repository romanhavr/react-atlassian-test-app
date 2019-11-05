import { call, put, takeEvery, delay } from 'redux-saga/effects';

function* fetchUser() {
   try {
      const user = yield call(asyncData);
      yield put({type: "USER_FETCH_SUCCEEDED", payload: 'fgh'});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* asyncData(user) {
    yield delay(2000);
    yield put({ type: 'ASYNC_TYPE', user: 'rty' })
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;