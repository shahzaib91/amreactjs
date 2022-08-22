import {ActionTypes} from '../constants/ActionTypes';

export const setError = (text) => {
    return { 
        type    : ActionTypes.SET_ERROR, 
        payload : text 
    };
};

export const resetError = () => {
    return { 
        type    : ActionTypes.RESET_ERROR
    };
};