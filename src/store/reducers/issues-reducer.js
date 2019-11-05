// @flow

import { ADD_ISSUE, EDIT_ISSUE } from "../actionTypes";
import { initialIssues } from '../../common/initialIssues';
import { labels } from '../../common/labelList';
import type { Item, Action }from "../../interfaces/interfaces";

const initialState: Array<Item> = [
  ...initialIssues
];

export default function (state: Array<Item> = initialState, action: Action) {
  switch (action.type) {

    case ADD_ISSUE: {
      const { data } = action.payload;
      return [
        ...state,
        {
          id: Date.now(),
          issue: data.issue,
          priority: data.priority.level,
          assignee: data.assignee.id,
          labelIds: labels.filter(label => data.labels.includes(label.name)).map(item => item.id)
        }
      ];
    }

    case EDIT_ISSUE: {
      const { data } = action.payload;
      const newIssues = [...state];
      newIssues[state.findIndex(issue => issue.id === data.id)] = {
        id: data.id,
        issue: data.issue,
        priority: data.priority.level,
        assignee: data.assignee.id,
        labelIds: labels.filter(label => data.labels.includes(label.name)).map(item => item.id)
      }
      return newIssues
    }

    default:
      return state;
  }
}
