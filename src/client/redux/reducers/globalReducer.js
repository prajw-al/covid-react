import * as types from "../actions/actionTypes";
export default function globalReducer(state = [], action) {
    
    switch (action.type) {
        case types.CREATE_GLOBAL:
            return [...state, { ...action.global }];
        default:
            return state;
    }
}