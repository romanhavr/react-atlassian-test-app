import { ADD_ISSUE, EDIT_ISSUE, CHOOSE_ITEM, SORT_TABLE } from "./actionTypes";

export const addIssue = (data, length) => ({
  type: ADD_ISSUE,
  payload: { data, length }
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
