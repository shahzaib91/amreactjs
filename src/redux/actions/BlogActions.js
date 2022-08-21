import {ActionTypes} from '../constants/ActionTypes';

export const setBlogList = (articles) => {
    return { 
        type    : ActionTypes.SET_BLOG_LIST, 
        payload : articles 
    };
};

export const getBlogItem = (article) => {
    return {
        type    :   ActionTypes.GET_BLOG_ITEM,
        payload :   article
    };
};