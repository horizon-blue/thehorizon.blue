import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Login from './Login';
import FadeView from 'components/_global/FadeView';
import Tabs from './Tabs';

import './style.css';

class Nav extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    state = { showLogin: false };

    renderNav = () => {
        return (
            <FadeView
                key="nav"
                in={!this.state.showLogin}
                classNames="transitionFade"
            >
                <Tabs
                    history={this.props.history}
                    location={this.props.location}
                    switchToLogin={this.switchToLogin}
                />
            </FadeView>
        );
    };

    cancelLogin = () => this.setState({ showLogin: false });
    switchToLogin = () => this.setState({ showLogin: true });

    renderLogin = () => {
        return (
            <FadeView
                key="loginPanel"
                in={this.state.showLogin}
                classNames="transitionFade"
            >
                <Login cancelLogin={this.cancelLogin} />
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
