// @flow

import {
  ADD_ISSUE,
  EDIT_ISSUE,
  EDIT_ISSUE_INLINE,
  EDIT_ASSIGNEE_INLINE,
  EDIT_LABELS_INLINE,
  EDIT_PRIORITY_INLINE,
  REMOVE_ISSUE
} from "../actionTypes";
import { initialIssues } from '../../common/initialIssues';
import { labels } from '../../common/labelList';
import type { Item, Action } from "../../interfaces/interfaces";

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
          labelIds /* (:number[]) */:
            labels
              .filter(({ name }) => data.labels.includes(name))
              .map<number>(({ id }) => id)
        }
      ];
    }

    case EDIT_ISSUE_INLINE: {
      const { item, value } = action.payload.data;
      const newIssues: Item[] = JSON.parse(JSON.stringify(state));
      newIssues[state.findIndex(({ id }) => id === item.id)].issue = value;
      return newIssues
    }

    case EDIT_ASSIGNEE_INLINE: {
      const { item, value } = action.payload.data;
      if (value) {
        const newIssues: Item[] = [...state];
        const editedIndex: number = state.findIndex(({ id }) => id === item.id);
        newIssues[editedIndex] = {
          ...state[editedIndex],
          assignee: value.id
        }
        return newIssues
      } else return state
    }

    case EDIT_LABELS_INLINE: {
      const { item, value } = action.payload.data;
      if (value) {
        const newIssues: Item[] = [...state];
        const editedIndex: number = state.findIndex(({ id }) => id === item.id);
        newIssues[editedIndex] = {
          ...state[editedIndex],
          labelIds: value.map(({ id }) => id)
        }
        return newIssues
      } else return state
    }

    case EDIT_PRIORITY_INLINE: {
      const { item, value } = action.payload.data;
      if (value) {
        const newIssues: Item[] = [...state];
        const editedIndex: number = state.findIndex(({ id }) => id === item.id);
        newIssues[editedIndex] = {
          ...state[editedIndex],
          priority: value.level
        }
        return newIssues
      } else return state
    }

    case EDIT_ISSUE: {
      const { data } = action.payload;
      const newIssues: Item[] = [...state];
      newIssues[state.findIndex(({ id }) => id === data.id)] = {
        id: data.id,
        issue: data.issue,
        priority: data.priority.level,
        assignee: data.assignee.id,
        labelIds:
          labels
            .filter(({ name }) => data.labels.includes(name))
            .map<number>(({ id }) => id)
      }
      return newIssues
    }

    case REMOVE_ISSUE: {
      const { data } = action.payload;
      const newIssues: Item[] = state.filter(({ id }) => id !== data.id);
      return newIssues
    }

    default:
      return state;
  }
}
