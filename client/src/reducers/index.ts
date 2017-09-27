import { combineReducers } from 'redux';
import { RobotsReducer } from './RobotsReducer';
import { CurrentAppReducer } from './CurrentAppReducer';
import { RecycleReducer } from './RecycleReducer';
import { ExtinguishReducer } from './ExtinguishReducer';

const rootReducer = combineReducers({
    robots: RobotsReducer,
    currentAppState: CurrentAppReducer,
    recycled: RecycleReducer,
    extinguished: ExtinguishReducer
});

export default rootReducer;