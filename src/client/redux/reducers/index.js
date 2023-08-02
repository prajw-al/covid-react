import { combineReducers } from "redux";
import selectedState from './stateReducer'
import areaReducer from './areaReducer'
import globalReducer from './globalReducer'
const rootReducer = combineReducers({
    selectedState,
    areaReducer,
    globalReducer
});
export default rootReducer;
