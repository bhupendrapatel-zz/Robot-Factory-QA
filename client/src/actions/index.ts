import axios from 'axios';

export const FETCH_ROBOTS = 'FETCH_ROBOTS';

export const ON_LOAD = 'onLoad';
export const QA_IN_PROGRESS = 'qaInProgress';
export const QA_COMPLETE = 'qaComplete';
export const CHANGE_APP_STATUS = 'changeAppStatus';

export const ADD_TO_RECYCLED = "ADD_TO_RECYCLED";
export const ADD_TO_EXTINGUISH = "ADD_TO_EXTINGUISH";
export const UPDATE_ROBOT_QA_CATEGORY = "UPDATE_ROBOT_QA_CATEGORY";
export const ADD_TO_FACTORY_SECOND = "ADD_TO_FACTORY_SECOND";
export const ADD_TO_QA_PASS = "ADD_TO_QA_PASS";

export const ADD_TO_SHIPPING = "ADD_TO_SHIPPING";
export const REMOVE_FROM_SHIPPING = "REMOVE_FROM_SHIPPING";

export const CREATE_SHIPMENT = "CREATE_SHIPMENT";

export const ADD_TO_EXTINGUISH_API = "ADD_TO_EXTINGUISH_API";
export const ADD_TO_RECYCLE_API = "ADD_TO_RECYCLE_API";

const BASE_URL = 'http://localhost:3000/api/';

const FETCH_BATCH_URL = BASE_URL+'robots';
const CREATE_SHIPMENT_URL = BASE_URL+'shipment/create';
const EXTINGUISH_URL = BASE_URL+'robots/extinguish';
const RECYCLE_URL = BASE_URL+'robots/recycle';

export const fetchRobots = () => {
    let request = axios.get(FETCH_BATCH_URL);
    return {
        type: FETCH_ROBOTS,
        payload: request
    }
};

export const changeAppStatus = (newStatus: string) => {
    return {
        type: CHANGE_APP_STATUS,
        newStatus
    }
};

export const addToRecycle = (robot: any) => {
    return {
        type: ADD_TO_RECYCLED,
        payload: robot
    }
};

export const addToExtinguish = (robot: any) => {
    return {
        type: ADD_TO_EXTINGUISH,
        payload: robot
    }
};

export const updateRobotQaCategory = (id: any, category: any) => {
    return {
        type: UPDATE_ROBOT_QA_CATEGORY,
        payload: {
            id,
            category
        }
    }
};

export const addToShipping = (robot: any) => {
    return {
        type: ADD_TO_SHIPPING,
        robot
    }
};

export const removeFromShipping = (robot: any) => {
    return {
        type: REMOVE_FROM_SHIPPING,
        robot
    }
};

export const createNewShipment = (arrayOfIds: any) => {
    const URL = `${CREATE_SHIPMENT_URL}?array=${JSON.stringify(arrayOfIds)}`;
    const request = axios.post(URL);
    return {
        type: CREATE_SHIPMENT,
        payload: request
    }
};

export const addApiToExtinguishFile = (id: any) => {
    const URL = `${EXTINGUISH_URL}/${JSON.stringify(id)}`;
    const request = axios.post(URL);
    return {
        type: ADD_TO_EXTINGUISH_API,
        payload: request
    }
};

export const addApiToRecycleFile = (id: any) => {
    const URL = `${RECYCLE_URL}/${JSON.stringify(id)}`;
    const request = axios.post(URL);
    return {
        type: ADD_TO_RECYCLE_API,
        payload: request
    }
};
