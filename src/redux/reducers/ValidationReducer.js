import { ActionTypes } from "../constants/ActionTypes"

export const ValidationReducer = (state = '', { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ERROR:
            return payload;
        case ActionTypes.RESET_ERROR:
            return '';
        default:
            return state;
    }
}