import React, {Component, Fragment} from 'react';
import elevatorStates from '../methods/elevatorStates'
import {splitState} from '../methods/elevatorMethods'
import brick from '../assets/img/brick.jpg'
import elevator from '../assets/img/elevator.png'
import shaft from '../assets/img/shaft.png'
import {observer} from 'mobx-react'

class FloorBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let img;
        switch (this.props.blockState) {
            case '.':
                img = shaft;
                break;
            case 'x':
                img = brick;
                break;
            default:
                img = elevator;
        }
        const blockSize = 100 / this.props.numBlocks;
        const style = {
            width: `${blockSize}%`,
            float: 'left',
            border: this.props.isActive ? '2px solid red' : 0
        };
        return (
            <img src={img} atl="" style={style}/>
        )
    }
}

class Floor extends Component {
    render() {
        console.log('this.props.floorState', this.props.floorState);
        const floorStateArr = this.props.floorState.split('');
        console.log('floorStateArr', floorStateArr);
        const numBlocks = floorStateArr.length;
        const floorBlocks = floorStateArr.map((blockState, index) =>
            <FloorBlock blockState={blockState}
                        isActive={this.props.activeStep === blockState}
                        numBlocks={numBlocks}
                        key={index}
            />
        );
        return (
            <div className="floor clearfix" style={{borderBottom: '5px solid #44474b'}}>
                {floorBlocks}
            </div>
        )
    }

}

class Building extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elevator: 'A',
            time: 0
        }
    }

    render() {
        let buildings = [];
        const {solution} = this.props.store;
        if (solution !== null && !(solution.includes('NO SUCCESSFUL ROUTE'))) {
            const steps = solution.split('');
            for (let s = 0; s < steps.length; s++) {
                const step = steps[s];
                const currentState = splitState(elevatorStates, s);
                const floors = currentState.map((floorState, index) =>
                    <Floor floorState={floorState} activeStep={step} key={index}/>
                );
                buildings.push(
                    <div style={{ marginBottom:10 }}>
                        <div className="text-center" style={{
                            background: '#44474b',
                            color: '#fff',
                        }}>
                            T = {s + 1}
                        </div>
                        {floors}
                    </div>
                )
            }
        } else {
            buildings = null;
        }
        return (
            <Fragment>
                {
                    solution !== null ?
                        <p className="lead">
                            {solution}
                        </p>
                        :
                        null
                }
                {buildings}
            </Fragment>
        );
    }
}

export default observer(Building);
