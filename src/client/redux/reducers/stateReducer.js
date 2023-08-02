import * as types from "../actions/actionTypes";
export default function stateReducer(state = [], action) {
    
    switch (action.type) {
        case types.CREATE_STATE:
            return [...state, { ...action.selectedState }];
        default:
            return state;
    }
}