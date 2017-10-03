import React from 'react';
import _ from 'lodash';
import {
    ADD_TO_FACTORY_SECOND,
    ADD_TO_QA_PASS
} from '../actions';

class ShippingPage extends React.Component<any, any> {
    renderRobotsList(category: any) {
        const factorySecondRobots = this.props.robots.filter((robot: any) => {
            return _.indexOf(robot.qaCategory, category) > -1 && !robot.shipped;
        });

        //Each robot’s id, name, colour and other configuration should be shown

        return factorySecondRobots.map((robot: any) => {
            const config = {
                sentience: robot.configuration.hasSentience ? 'Yes' : 'No',
                wheels: robot.configuration.hasWheels ? 'Yes' : 'No',
                tracks: robot.configuration.hasTracks ? 'Yes' : 'No'
            };
            return (
                <tr key={robot.id}>
                    <td>{robot.id}</td>
                    <td>{robot.name}</td>
                    <td>{config.sentience}</td>
                    <td>{config.wheels}</td>
                    <td>{config.tracks}</td>
                    <td>{robot.configuration.numberOfRotors}</td>
                    <td>{_.capitalize(robot.configuration.Colour)}</td>
                    <td><input type="button" className="btn btn-success" value="Add To Shipment"
                               onClick={() => {this.props.addToShipping(robot)}}/></td>
                </tr>
            );
        });
    }

    renderShippingList() {
        const shippedRobotsList = this.props.robots.filter((robot: any = {}) => robot.shipped);

        return shippedRobotsList.map((robot:  any = {}) => {
            const config = {
                sentience: robot.configuration.hasSentience ? 'Yes' : 'No',
                wheels: robot.configuration.hasWheels ? 'Yes' : 'No',
                tracks: robot.configuration.hasTracks ? 'Yes' : 'No'
            };
            return (
                <tr key={robot.id}>
                    <td>{robot.id}</td>
                    <td>{robot.name}</td>
                    <td>{config.sentience}</td>
                    <td>{config.wheels}</td>
                    <td>{config.tracks}</td>
                    <td>{robot.configuration.numberOfRotors}</td>
                    <td>{_.capitalize(robot.configuration.Colour)}</td>
                    <td><input type="button" className="btn btn-danger" value="Remove From Shipment"
                               onClick={() => {this.props.removeFromShipping(robot)}}/></td>
                </tr>
            );
        });
    }

    renderSendShipmentButton() {
        const shippedRobotsList = this.props.robots.filter((robot:  any = {}) => robot.shipped);
        if (shippedRobotsList.length > 0) {
            return (
                <input type="button" className="btn btn-primary" value="Send Shipment"
                       onClick={()=>{this.sendShipment()}}/>
            );
        }
    }

    sendShipment() {
        const shippedRobotsList = this.props.robots.filter((robot:  any = {}) => robot.shipped);
        const idOfShippedRobots = shippedRobotsList.map((robot:  any = {}) => {
            return robot.id;
        });
        this.props.createNewShipment(idOfShippedRobots);
    }

    render() {
        return (
            <div className="shipping-list">
                <h2>Factory Seconds</h2>
                <table className="table table-default">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sentience</th>
                        <th>Wheels</th>
                        <th>Tracks</th>
                        <th>Rotors</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderRobotsList(ADD_TO_FACTORY_SECOND) }
                    </tbody>
                </table>

                <h2>QA Passed</h2>
                <table className="table table-default">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sentience</th>
                        <th>Wheels</th>
                        <th>Tracks</th>
                        <th>Rotors</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderRobotsList(ADD_TO_QA_PASS) }
                    </tbody>
                </table>

                <h2>Ready To Ship</h2>
                <table className="table table-default">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Sentience</th>
                        <th>Wheels</th>
                        <th>Tracks</th>
                        <th>Rotors</th>
                        <th>Color</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.renderShippingList() }
                    </tbody>
                </table>
                { this.renderSendShipmentButton() }
            </div>
        );
    }
}
export default ShippingPage;