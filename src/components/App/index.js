import React, { Component } from 'react';
import classnames from 'classnames';

import './style.css';

import Header from './Header';
import Router from './Router';

class App extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('App', className)} {...props}>
                <Header />
                <Router />
            </div>
        );
    }
}

export default App;
