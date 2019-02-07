import React, {Component} from 'react';
import {observer} from "mobx-react";

class Footer extends Component {
    render() {
        return (
            <footer className="my-5 pt-5 text-muted text-center text-small">
                <p className="mb-1">by Jaret Burkett</p>
            </footer>
        );
    }
}

export default observer(Footer);
