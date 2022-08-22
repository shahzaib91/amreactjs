import { combineReducers } from "redux";
import { ListReducer, ArticleReducer, ArticleCommentsReducer } from "../reducers/BlogReducer";
import { ValidationReducer } from "../reducers/ValidationReducer";

const reducers = combineReducers ({
    BlogData     :   ListReducer,
    Article      :   ArticleReducer,
    Validation   :   ValidationReducer,
    CommentList  :   ArticleCommentsReducer
});
export default reducers;
