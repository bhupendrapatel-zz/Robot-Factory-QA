import React from 'react';
import {
    ON_LOAD,
    QA_IN_PROGRESS,
    QA_COMPLETE,
    CHANGE_APP_STATUS
} from '../actions';
import { categorizeRobots } from '../util/categorizeRobots';

export const ROBOT_STATUS = {
    ON_FIRE: "on fire",
    RUSTY: "rusty",
    LOOSE_SCREWS: "loose screws",
    PAINT_SCRATHCED: "paint scratched"
};


class LandingPage extends React.Component<any, any> {
    componentDidMount() {
        this.props.fetchRobots();
    }

    renderBatchLoadedRobots() {
        if (!this.props.robots.length) {
            return (
                <div>Loading robots from batch..</div>
            );
        }
        const robotsInBatch = this.props.robots[0].data;
        return (
            robotsInBatch.map((robot: any) => <div key={robot.id}>{robot.id}</div>)
        );
    };

    startQA() {
        this.props.changeAppStatus(QA_IN_PROGRESS);
        categorizeRobots(this.props.robots, this.props.addToRecycle, this.props.addToExtinguish, this.props.updateRobotQaCategory, this.props.addApiToExtinguishFile, this.props.addApiToRecycleFile);
        this.props.changeAppStatus(QA_COMPLETE);
    }

    renderButton() {
        let label = "Start QA";

        if (this.props.currentAppState !== QA_COMPLETE) {
            return (
                <input className="btn btn-danger" type="button" value={label} onClick={this.startQA.bind(this)}/>
            );
        } else {
            return (
                <input className="btn btn-primary" type="button" value="Start Shipping"
                       onClick={() => {this.props.history.push('/shipping')}}/>
            );
        }
    }

    renderMessage() {
        switch (this.props.currentAppState) {
            case ON_LOAD:
                return `Batch has been loaded with ${this.props.robots.length} robots. Click button to continue.`;
            case QA_IN_PROGRESS:
                return "Please wait. Your batch is being processed";
            case QA_COMPLETE:
                return "QA complete. Click button start shipping";
            default:
                return "App state out of sync";
        }
    }

    render() {
        return (
            <div className="landing-page">
                <h2>Robot Factory</h2>
                <div className="alert alert-success">
                    { this.renderMessage() }
                </div>
                <p></p>
                <div>
                    { this.renderButton() }
                </div>
            </div>
        );
    }
}
export default LandingPage;