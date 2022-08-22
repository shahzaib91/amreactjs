import { Action } from "history";
import { ActionTypes } from "../constants/ActionTypes"

const initialState = {
    BlogList: []
}

export const ListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_BLOG_LIST:
            return { ...state, BlogList: payload };
        case ActionTypes.DEL_BLOG_ITEM:
            return { ...state, BlogList: state.BlogList.filter(i=>i.id !== payload)};
        default:
            return state;
    }
}

export const ArticleReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_BLOG_ITEM:
            return { ...state, ...payload };
        case ActionTypes.RESET_BLOG_ITEM:
            return { };
        default:
            return state;
    }
}

export const ArticleCommentsReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_COMMENT_LIST:
            return payload;
        case ActionTypes.RESET_COMMENT_LIST:
            return state;
        default:
            return state;
    }
}