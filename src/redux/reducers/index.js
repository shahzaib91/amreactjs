import { combineReducers } from "redux";
import { BlogReducer } from "../reducers/BlogReducer";

const reducers = combineReducers({
    BlogData     :   BlogReducer,
});
export default reducers;
