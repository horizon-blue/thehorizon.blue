import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Login from './Login';
import _ from 'lodash';
import { connect } from 'react-redux';
import FadeView from '../_global/FadeView';
import Tabs from './Tabs';

import './style.css';

function mapStateToProps(state, ownProps) {
    return {
        token: state.token,
    };
}

@connect(mapStateToProps)
class Nav extends PureComponent {
    static propTypes = {
        showNav: PropTypes.bool,
        token: PropTypes.string,
        cancelLogin: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    renderNav() {
        return (
            <FadeView
                key="nav"
                in={!_.isNull(this.props.token)}
                classNames="transitionFade"
            >
                <Tabs
                    history={this.props.history}
                    location={this.props.location}
                />
            </FadeView>
        );
    }

    renderLogin() {
        return (
            <FadeView
                key="loginPanel"
                in={_.isNull(this.props.token)}
                classNames="transitionFade"
            >
                <Login cancelLogin={this.props.cancelLogin} />
            </FadeView>
        );
    }
    render() {
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
    }
}

export default Nav;
