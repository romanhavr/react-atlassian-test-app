// @flow

import * as AT from "./actionTypes";
import type { Item,
  EditFormActionData,
  EditIssueInlineActionData,
  EditAssigneeInlineActionData,
  EditLabelsInlineActionData,
  EditPriorityInlineActionData,
  Option,
  SagaSucceededData } from '../interfaces/interfaces';

export const addIssue = (data: Item) => ({
  type: AT.ADD_ISSUE,
  payload: { data }
});

export const editIssue = (data: EditFormActionData) => ({
  type: AT.EDIT_ISSUE,
  payload: { data }
});

export const editIssueInline = (data: EditIssueInlineActionData) => ({
  type: AT.EDIT_ISSUE_INLINE,
  payload: { data }
});

export const editAssigneeInline = (data: EditAssigneeInlineActionData) => ({
  type: AT.EDIT_ASSIGNEE_INLINE,
  payload: { data }
});

export const editLabelsInline = (data: EditLabelsInlineActionData) => ({
  type: AT.EDIT_LABELS_INLINE,
  payload: { data }
});

export const editPriorityInline = (data: EditPriorityInlineActionData) => ({
  type: AT.EDIT_PRIORITY_INLINE,
  payload: { data }
});

export const removeIssue = (data: Item) => ({
  type: AT.REMOVE_ISSUE,
  payload: { data }
});

export const chooseItem = (item: Item) => ({
  type: AT.CHOOSE_ITEM,
  payload: { item }
});

export const sortTable = (value: Option) => ({
  type: AT.SORT_TABLE,
  payload: { value }
});

export const userFetchReq = (data: string) => ({
  type: AT.USER_FETCH_REQUESTED,
  payload: { data }
})

export const userFetchSucceeded = (data: SagaSucceededData) => ({
  type: AT.USER_FETCH_SUCCEEDED,
  payload: { data }
})

export const userFetchFailed = (data: string) => ({
  type: AT.USER_FETCH_FAILED,
  payload: { data }
})

export const actionType = (data: string) => ({
  type: AT.ASYNC_TYPE,
  payload: { data }
})