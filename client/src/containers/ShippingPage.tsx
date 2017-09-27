import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ShippingPage from '../components/ShippingPage';
import {
    addToShipping,
    removeFromShipping,
    createNewShipment
} from '../actions';

const mapStateToProps = (state: any) => {
    return {
        robots: state.robots
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({ addToShipping, removeFromShipping, createNewShipment }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShippingPage);