import React, {Component} from 'react';
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
            width:`${blockSize}%`,
            float:'left'
        };
        return (
            <img src={img} style={style}/>
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
            <FloorBlock blockState={blockState} numBlocks={numBlocks} key={index}/>
        );
        return (
            <div className="floor clearfix" style={{borderBottom:'5px solid #44474b'}}>
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
        const currentState = splitState(elevatorStates, this.state.time);
        const floors = currentState.map((floorState, index) =>
            <Floor floorState={floorState} key={index}/>
        );
        return (
            <div>
                <div style={{background:'#44474b', height:20}}></div>
                {floors}
            </div>
        );
    }
}

export default observer(Building);
