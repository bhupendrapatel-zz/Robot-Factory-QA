import { ADD_TO_RECYCLED } from '../actions';

export const RecycleReducer = (state: any = [], action: any = {}) => {
    switch (action.type) {
        case ADD_TO_RECYCLED:
            return [...state, action.payload];
        default:
            return state;
    }
};
