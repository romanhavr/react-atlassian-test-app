// @flow

import { expectSaga } from 'redux-saga-test-plan';
import mySaga from './sagas';
import { userList } from '../common/userList';

expectSaga.DEFAULT_TIMEOUT = 2500;

it('Testing saga for succees', () => {
    return expectSaga(mySaga)
    .put({
        type: "ASYNC_TYPE",
        userInfo: 'User Info'
    })
    .put({
        type: "USER_FETCH_SUCCEEDED",
        payload: {
            status: 'Fetch Succeeded payload',
            users: userList
        }
    })
    .dispatch({
        type: "USER_FETCH_REQUESTED" 
    }).run()
})

// Test for FAILURE
// it('Testing saga for failure', () => {
//     return expectSaga(mySaga)
//     .put({
//         type: "USER_FETCH_FAILED",
//         message: 'call: argument of type {context, fn} has undefined or null `fn`'
//     })
//     .dispatch({
//         type: "USER_FETCH_REQUESTED" 
//     }).run()
// })