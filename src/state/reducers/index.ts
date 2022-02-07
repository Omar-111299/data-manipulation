import { combineReducers } from "redux";
import tabReducer from './showTab'

const reducers = combineReducers({
    tab: tabReducer
})

export default reducers;

export type State = ReturnType<typeof reducers>