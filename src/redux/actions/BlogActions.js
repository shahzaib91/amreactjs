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

export const delBlogItem = (id) => {
    return {
        type    :   ActionTypes.DEL_BLOG_ITEM,
        payload :   id
    };
};

export const resetBlogItem = () => {
    return {
        type    :   ActionTypes.RESET_BLOG_ITEM
    };
};

export const setArticleComments = (comments) => {
    return { 
        type    : ActionTypes.SET_COMMENT_LIST, 
        payload : comments 
    };
};

export const resetArticleComments = () => {
    return { 
        type    : ActionTypes.RESET_COMMENT_LIST
    };
};