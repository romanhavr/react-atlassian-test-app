//@flow

import { CHOOSE_ITEM, SORT_TABLE } from "../actionTypes";
import type { Item, SortingOptions, UIState, Action }from "../../interfaces/interfaces";

const initialState: UIState = {
  chosenItem: null,
  sortBy: []
};

export default function (state: UIState = initialState, action: Action) {
  switch (action.type) {

    case CHOOSE_ITEM: {
      const item: Item = action.payload.item;
      return {
        ...state,
        chosenItem: item
      };
    }

    case SORT_TABLE: {
      const value: SortingOptions = action.payload.value;
      return {
        ...state,
        sortBy: value
      };
    }

    default:
      return state;
  }
}
