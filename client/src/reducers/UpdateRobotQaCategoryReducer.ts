import { UPDATE_ROBOT_QA_CATEGORY } from '../actions';

export const UpdateRobotQaCategoryReducer = (state: any = [], action: any = {}) => {
    switch (action.type) {
        case UPDATE_ROBOT_QA_CATEGORY:
            return state.map((robot: any = {}) => {
                if (robot.id !== action.payload.id) {
                    return robot;
                }
                return robot.qaCategory = action.payload.category;
            });
        default:
            return state;
    }
};
