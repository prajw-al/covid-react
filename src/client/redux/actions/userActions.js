import * as types from "./actionTypes"
export function createState(selectedState) {
    return { type: types.CREATE_STATE, selectedState }
}
export function createAreaData(areas) {
    return { type: types.CREATE_AREA, areas }
}

export function createGlobalData(global) {
    return { type: types.CREATE_GLOBAL, global }
}