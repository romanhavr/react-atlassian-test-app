import { ADD_ISSUE,
        EDIT_ISSUE,
        CHOOSE_ITEM,
        SORT_TABLE,
        USER_FETCH_REQUESTED,
        USER_FETCH_SUCCEEDED,
        ASYNC_TYPE
      } from "./actionTypes";

export const addIssue = (data) => ({
  type: ADD_ISSUE,
  payload: { data }
});

export const editIssue = data => ({
  type: EDIT_ISSUE,
  payload: { data }
});

export const chooseItem = item => ({
  type: CHOOSE_ITEM,
  payload: { item }
});

export const sortTable = value => ({
  type: SORT_TABLE,
  payload: { value }
});

export const userFetchReq = data => ({
  type: USER_FETCH_REQUESTED,
  payload: { data }
})

export const userFetchSucceeded = data => ({
  type: USER_FETCH_SUCCEEDED,
  payload: { data }
})

export const actionType = data => ({
  type: ASYNC_TYPE,
  payload: { data }
})