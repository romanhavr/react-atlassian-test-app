import { CHOOSE_ITEM, SORT_TABLE } from "../actionTypes";
// import { initialIssues } from '../../common/initialIssues';
// import { labels } from '../../common/labelList';
// import { userList } from '../../common/userList';

const initialState = {
//   ...initialIssues,
  chosenItem: null,
  sortBy: []
};

export default function (state = initialState, action) {
  switch (action.type) {

    // case ADD_ISSUE: {
    //     const { data, length } = action.payload;
    //     const newLabelIds = [];
    //     Object.keys(data).forEach( key =>
    //       labels.forEach(label => {
    //         if (label.name === key && data[key].length)
    //           newLabelIds.push(label.id)
    //       })
    //     );
    //     const assigneeId = userList.filter( user => 
    //         user.displayName === data.assignee.value
    //       )[0].id
    //   return {
    //     ...state,
    //     [length + 1]: {
    //       id: length + 1,
    //       content: {
    //         id: length + 1,
    //         issue: data.issue,
    //         priority: data.priority,
    //         assignee: assigneeId,
    //         labelIds: newLabelIds
    //       }
    //     }
    //   };
    // }

    // case EDIT_ISSUE: {
    //   const { data } = action.payload;
    //   const newLabelIds = [];
    //   Object.keys(data).forEach( key =>
    //     labels.forEach(label => {
    //       if (label.name === key && data[key].length)
    //         newLabelIds.push(label.id)
    //     })
    //   );
    //   const assigneeId = userList.filter( user => 
    //       user.displayName === data.assignee.value
    //     )[0].id
    //   return {
    //     ...state,
    //     [data.id - 1]: {
    //       id: data.id,
    //       content: {
    //         id: data.id,
    //         issue: data.issue,
    //         priority: data.priority,
    //         assignee: assigneeId,
    //         labelIds: newLabelIds
    //       }
    //     }
    //   };
    // }

    case CHOOSE_ITEM: {
      const { item } = action.payload;
      return {
        ...state,
        chosenItem: item
      };
    }

    case SORT_TABLE: {
      const { value } = action.payload;
      return {
        ...state,
        sortBy: value
      };
    }

    default:
      return state;
  }
}
