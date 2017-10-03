import _ from 'lodash';
import {
    ADD_TO_RECYCLED,
    ADD_TO_EXTINGUISH,
    ADD_TO_FACTORY_SECOND,
    ADD_TO_QA_PASS,
    ADD_TO_EXTINGUISH_API,
    ADD_TO_RECYCLE_API
} from '../actions';
import STORE from '../index';

const ROBOT_STATUS = {
    ON_FIRE: "on fire",
    RUSTY: "rusty",
    LOOSE_SCREWS: "loose screws",
    PAINT_SCRATCHED: "paint scratched"
};

const COLOR = {
    RED: "red",
    BLUE: "blue",
    GREEN: "green"
};


const filterToCategory = (robotItem: any, addToExtinguish: any, addToRecycle: any, updateRobotQaCategory: any, addApiToExtinguishFile: any, addApiToRecycleFile: any) => {
    const {configuration, statuses, id} = robotItem;

    if (configuration.hasSentience && (_.indexOf(statuses, ROBOT_STATUS.ON_FIRE) > -1)) {
        addToExtinguish(robotItem);
        updateRobotQaCategory(id, ADD_TO_EXTINGUISH);
        addApiToExtinguishFile(id);
    }

    if (hasFewerThan3GreaterThan8Rotors(configuration) ||
        hasAnyRotorAndBlue(configuration) ||
        hasBothWheelsAndTracks(configuration) ||
        hasWheelsAndIsRusty(configuration, statuses) ||
        hasSentienceAndLooseScrews(configuration, statuses) ||
        isOnFire(statuses)) {
        addToRecycle(robotItem);
        updateRobotQaCategory(id, ADD_TO_RECYCLED);
        addApiToRecycleFile(id);
    }
};

const hasFewerThan3GreaterThan8Rotors = (configuration: any = {}) => {
    return configuration.numberOfRotors < 3 || configuration.numberOfRotors > 8;
};

const hasAnyRotorAndBlue = (configuration: any = {}) => {
    return configuration.numberOfRotors > 0 && configuration.colour === COLOR.BLUE;
};

const hasBothWheelsAndTracks = (configuration: any = {}) => {
    return configuration.hasWheels && configuration.hasTracks;
};

const hasWheelsAndIsRusty = (configuration: any = {}, statuses: any = []) => {
    return configuration.hasWheels && _.indexOf(statuses, ROBOT_STATUS.RUSTY) > -1;
};

const hasSentienceAndLooseScrews = (configuration: any = {}, statuses: any = []) => {
    return configuration.hasSentience && _.indexOf(statuses, ROBOT_STATUS.LOOSE_SCREWS) > -1;
};

const isOnFire = (statuses: any) => {
    return _.indexOf(statuses, ROBOT_STATUS.ON_FIRE) > -1;
};

const isRusty = (statuses: any = []) => {
    return _.indexOf(statuses, ROBOT_STATUS.RUSTY) > -1;
};

const hasLooseScrews = (statuses: any = []) => {
    return _.indexOf(statuses, ROBOT_STATUS.LOOSE_SCREWS) > -1;
};

const hasScratchedPaint = (statuses: any = []) => {
    return _.indexOf(statuses, ROBOT_STATUS.PAINT_SCRATCHED) > -1;
};


const sortForShipping = (robot: any = {}, updateRobotQaCategory: any) => {
    const {id, statuses} = robot;
    if (isRusty(statuses) || hasLooseScrews(statuses) || hasScratchedPaint(statuses)) {
        updateRobotQaCategory(id, ADD_TO_FACTORY_SECOND);
    } else {
        updateRobotQaCategory(id, ADD_TO_QA_PASS);
    }
};

export const categorizeRobots = (robotsArray: any, addToRecycle: any, addToExtinguish: any, updateRobotQaCategory: any, addApiToExtinguishFile: any, addApiToRecycleFile: any) => {
    robotsArray.forEach((robot: any = {}) => {
        filterToCategory(robot, addToRecycle, addToExtinguish, updateRobotQaCategory, addApiToExtinguishFile, addApiToRecycleFile);
    });
    let robotsForShipping = STORE.getState().robots.filter((robot: any = {}) => {
        return !(robot.qaCategory.length > 0);
    });
    robotsForShipping.forEach((robot: any = {}) => {
        sortForShipping(robot, updateRobotQaCategory);
    });
};
