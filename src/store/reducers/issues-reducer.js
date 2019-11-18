// @flow

import { ADD_ISSUE, EDIT_ISSUE, REMOVE_ISSUE } from "../actionTypes";
import { initialIssues } from '../../common/initialIssues';
import { labels } from '../../common/labelList';
import type { Item, Action }from "../../interfaces/interfaces";

const initialState: Item[] = [
  ...initialIssues
];

export default function (state: Item[] = initialState, action: Action) {
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
          labelIds /* (:number[]) */ : 
            labels
              .filter(({ name }) => data.labels.includes(name))
              .map<number>(({ id }) => id)
        }
      ];
    }

    // case EDIT_ISSUE_INLINE !!!

    case EDIT_ISSUE: {
      const { data } = action.payload;
      const newIssues: Item[] = [...state];
      newIssues[state.findIndex( ({ id }) => id === data.id)] = {
        id: data.id,
        issue: data.issue,
        priority: data.priority.level,
        assignee: data.assignee.id,
        labelIds: 
          labels
            .filter( ({ name }) => data.labels.includes(name))
            .map<number>( ({id}) => id)
      }
      return newIssues
    }

    case REMOVE_ISSUE: {
      const { data } = action.payload;
      const newIssues: Item[] = state.filter( ({id}) => id !== data.id);
      return newIssues
    }

    default:
      return state;
  }
}
