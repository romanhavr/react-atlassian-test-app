import { combineReducers } from "redux";
import issues from "./issues-reducer";
import ui from "./ui-reducer";

export default combineReducers({ 
    issues,
    ui
});
