import React, { Component } from 'react';
import classnames from 'classnames';
import './style.css';
import logo from './logo.svg';

class Header extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <div className={classnames('App-header', className)} {...props}>
                <img src={logo} className="App-logo" alt="logo" />
                <h2>欢迎来到天际林</h2>
            </div>
        );
    }
}

export default Header;
