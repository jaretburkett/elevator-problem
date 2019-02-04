import React, {Component} from 'react';
import {getElevatorArr, splitState, findElevatorPath} from "../methods/elevatorMethods";
import elevatorStates from "../methods/elevatorStates";
import {observer} from "mobx-react";

class Form extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // this.setState({
        //     [name]: value
        // });
        this.props.store[name] = value;
        this.props.store.solution = findElevatorPath(
            elevatorStates,
            this.props.store.startingElevator,
            this.props.store.destination
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleSubmit();
    };

    render() {
        const elevatorNamesArr = getElevatorArr(elevatorStates);
        const numFloors = splitState(elevatorStates, 0).length;
        const numTimes = elevatorStates.length;
        const startingElevatorOptions = elevatorNamesArr.map((elevatorName, index) =>
            <option key={index}>{elevatorName}</option>
        );
        let possibleDestinationOptions = [];
        for (let t = 0; t < numTimes; t++) {
            let floorOptionsArr = [];
            for (let f = 0; f < numFloors; f++) {
                floorOptionsArr.push(<option key={`${f + 1}-${t + 1}`}
                                             value={`${f + 1}-${t + 1}`}>{`Floor: ${f + 1}`}</option>)
            }
            possibleDestinationOptions.push(
                <optgroup key={`${t + 1}`} label={`Time: ${t + 1}`}>
                    {floorOptionsArr}
                </optgroup>
            )
        }
        const {startingElevator, destination} = this.props.store;

        const startingElevatorValue = startingElevator === null ? elevatorNamesArr[0] : startingElevator;
        const destinationValue = destination === null ? `1-1` : destination;

        return (
            <form className="needs-validation" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label>Starting Elevator</label>
                        <select className="form-control"
                                name="startingElevator"
                                value={startingElevatorValue}
                                onChange={this.handleChange}
                        >
                            {startingElevatorOptions}
                        </select>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Final Destination</label>
                        <select className="form-control"
                                name="destination"
                                value={destinationValue}
                                onChange={this.handleChange}
                        >
                            {possibleDestinationOptions}
                        </select>
                    </div>
                </div>
                {/*<hr className="mb-4"/>*/}
                {/*<button className="btn btn-primary btn-lg btn-block" type="submit">Calculate*/}
                {/*</button>*/}
            </form>
        );
    }
}

export default observer(Form);
