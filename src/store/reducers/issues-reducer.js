import { ADD_ISSUE, EDIT_ISSUE } from "../actionTypes";
import { initialIssues } from '../../common/initialIssues';
import { labels } from '../../common/labelList';
import { userList } from '../../common/userList';

const initialState = [
  ...initialIssues
];

export default function (state = initialState, action) {
  switch (action.type) {

    case ADD_ISSUE: {
      const { data } = action.payload;
      const newLabelIds = [];
      Object.keys(data).forEach(key =>
        labels.forEach(label => {
          if (label.name === key && data[key].length)
            newLabelIds.push(label.id)
        })
      );
      const assigneeId = userList.find(user =>
        user.displayName === data.assignee.value
      ).id
      return [
        ...state,
        {
          id: Date.now(),
          issue: data.issue,
          priority: data.priority,
          assignee: assigneeId,
          labelIds: newLabelIds
        }
      ];
    }

    case EDIT_ISSUE: {
      const { data } = action.payload;
      const newLabelIds = [];
      Object.keys(data).forEach(key =>
        labels.forEach(label => {
          if (label.name === key && data[key].length)
            newLabelIds.push(label.id)
        })
      );
      const assigneeId = userList.find(user =>
        user.displayName === data.assignee.value
      ).id;
      const newIssues = [...state];
      newIssues[state.findIndex(issue => issue.id === data.id)] = {
        id: data.id,
        issue: data.issue,
        priority: data.priority,
        assignee: assigneeId,
        labelIds: newLabelIds
      }
      return newIssues
    }

    default:
      return state;
  }
}
