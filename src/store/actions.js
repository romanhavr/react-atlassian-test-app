import * as AT from "./actionTypes";

export const addIssue = (data) => ({
  type: AT.ADD_ISSUE,
  payload: { data }
});

export const editIssue = data => ({
  type: AT.EDIT_ISSUE,
  payload: { data }
});

export const removeIssue = data => ({
  type: AT.REMOVE_ISSUE,
  payload: { data }
});

export const chooseItem = item => ({
  type: AT.CHOOSE_ITEM,
  payload: { item }
});

export const sortTable = value => ({
  type: AT.SORT_TABLE,
  payload: { value }
});

export const userFetchReq = data => ({
  type: AT.USER_FETCH_REQUESTED,
  payload: { data }
})

export const userFetchSucceeded = data => ({
  type: AT.USER_FETCH_SUCCEEDED,
  payload: { data }
})

export const userFetchFailed = data => ({
  type: AT.USER_FETCH_FAILED,
  payload: { data }
})

export const actionType = data => ({
  type: AT.ASYNC_TYPE,
  payload: { data }
})