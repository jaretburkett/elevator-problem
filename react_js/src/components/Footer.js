import React, {Component} from 'react';
import {observer} from "mobx-react";

class Footer extends Component {
    render() {
        return (
            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">&copy; 2018 Jaret Burkett</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        );
    }
}

export default observer(Footer);
