import { call, put, takeEvery, delay } from 'redux-saga/effects';

function* fetchUser() {
   try {
      yield call(() => asyncData('User Info'));
      // yield call(asyncData('qwe'));          // for Fetch Faile
      yield put({type: "USER_FETCH_SUCCEEDED", payload: 'Fetch Succeeded payload'});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* asyncData(user) {
    yield delay(2000);
    yield put({ type: 'ASYNC_TYPE', user })
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;