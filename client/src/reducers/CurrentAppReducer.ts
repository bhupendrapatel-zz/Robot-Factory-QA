import {
    ON_LOAD,
    QA_COMPLETE,
    CHANGE_APP_STATUS
} from '../actions';

export const CurrentAppReducer = (state: string = ON_LOAD, action: any = {}) => {
    switch (action.type) {
        case CHANGE_APP_STATUS:
            return action.newStatus;
        default:
            return state;
    }
};