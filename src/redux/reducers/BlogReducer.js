import { ActionTypes } from "../constants/ActionTypes"

const initialState = {
    BlogList    :   []
}

export const BlogReducer = (state = initialState, {type, payload}) =>
{
    switch(type)
    {
        case ActionTypes.SET_BLOG_LIST:
            return {...state, BlogList : payload};
        default:
            return state;
    }
}