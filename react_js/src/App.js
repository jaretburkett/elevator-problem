import React, {Component, Fragment} from 'react';
import logo from './assets/img/restream_logo.png';
import Footer from "./components/Footer";
import Building from "./components/Building";
import {observer} from 'mobx-react'
import Form from "./components/Form";

class App extends Component {
    render() {
        return (
            <Fragment>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src={logo} alt="" style={{maxWidth:200}}/>
                    <h2>Elevator Problem</h2>
                    <p className="lead">Below is a solution to the elevator problem written in React.js</p>
                </div>

                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Solution</span>
                        </h4>
                        <Building {...this.props}/>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Elevator Options</h4>
                        <Form {...this.props}/>
                    </div>
                </div>
                <Footer {...this.props}/>
            </Fragment>
        );
    }
}

export default observer(App);
