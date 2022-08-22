import { combineReducers } from "redux";
import { ListReducer, ArticleReducer } from "../reducers/BlogReducer";
import { ValidationReducer } from "../reducers/ValidationReducer";

const reducers = combineReducers ({
    BlogData     :   ListReducer,
    Article      :   ArticleReducer,
    Validation   :   ValidationReducer
});
export default reducers;
