// @flow

import { ADD_ISSUE, EDIT_ISSUE, REMOVE_ISSUE } from "../actionTypes";
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
          labelIds: labels.filter(({ name }) => data.labels.includes(name)).map(({ id }) => id)
        }
      ];
    }

    case EDIT_ISSUE: {
      const { data } = action.payload;
      const newIssues = [...state];
      newIssues[state.findIndex( ({ id }) => id === data.id)] = {
        id: data.id,
        issue: data.issue,
        priority: data.priority.level,
        assignee: data.assignee.id,
        labelIds: labels.filter( ({ name }) => data.labels.includes(name)).map( ({id}) => id)
      }
      return newIssues
    }

    case REMOVE_ISSUE: {
      const { data } = action.payload;
      const newIssues = state.filter( ({id}) => id !== data.id);
      // newIssues[state.findIndex( ({ id }) => id === data.id)] = {
      //   id: data.id,
      //   issue: data.issue,
      //   priority: data.priority.level,
      //   assignee: data.assignee.id,
      //   labelIds: labels.filter( ({ name }) => data.labels.includes(name)).map( ({id}) => id)
      // }
      return newIssues
    }

    default:
      return state;
  }
}
