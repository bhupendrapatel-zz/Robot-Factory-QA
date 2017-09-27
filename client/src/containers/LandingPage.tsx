import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LandingPage from '../components/LandingPage';
import {
    fetchRobots,
    changeAppStatus,
    addToRecycle,
    addToExtinguish,
    updateRobotQaCategory,
    addApiToExtinguishFile,
    addApiToRecycleFile
} from '../actions';

const mapStateToProps = (state: any) => {
    return {
        robots: state.robots,
        currentAppState: state.currentAppState,
        recycled: state.recycled,
        extinguished: state.extinguished
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        fetchRobots,
        changeAppStatus,
        addToRecycle,
        addToExtinguish,
        updateRobotQaCategory,
        addApiToExtinguishFile,
        addApiToRecycleFile
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);