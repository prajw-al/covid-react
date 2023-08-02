import * as types from "../actions/actionTypes";
export default function areaReducer(state = [], action) {
    
    switch (action.type) {
        case types.CREATE_AREA:
            return [...state, { ...action.areas }];
        default:
            return state;
    }
}