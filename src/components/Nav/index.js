import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Login from './Login';
import FadeView from '@_global/FadeView';
import Tabs from './Tabs';

import './style.css';

class Nav extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        showLogin: PropTypes.bool,
        toggleLogin: PropTypes.func.isRequired,
    };

    renderNav = () => {
        return (
            <FadeView
                key="nav"
                in={!this.props.showLogin}
                classNames="transitionFade"
            >
                <Tabs
                    history={this.props.history}
                    location={this.props.location}
                />
            </FadeView>
        );
    };

    renderLogin = () => {
        return (
            <FadeView
                key="loginPanel"
                in={this.props.showLogin}
                classNames="transitionFade"
            >
                <Login cancelLogin={this.props.toggleLogin} />
            </FadeView>
        );
    };

    render = () => {
        return (
            <Row justify="center" type="flex">
                <div className="nav">
                    <Col className="centered-horizontal">
                        {this.renderNav()}
                        {this.renderLogin()}
                    </Col>
                </div>
            </Row>
        );
    };
}

export default Nav;
