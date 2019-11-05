import { combineReducers } from "redux";
import issues from "./issues-reducer";
import ui from "./ui-reducer";
import saga from "./saga-reducer";

export default combineReducers({ 
    issues,
    ui,
    saga
});
