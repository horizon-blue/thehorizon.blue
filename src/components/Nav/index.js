import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import Login from './Login';
import _ from 'lodash';
import { connect } from 'react-redux';
import FadeView from '../_global/FadeView';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';

function mapStateToProps(state, ownProps) {
    return {
        token: state.token,
    };
}

@connect(mapStateToProps)
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animating: false,
        };
    }

    renderNav() {
        return (
            <FadeView key="nav" in={!_.isNull(this.props.token)}>
                <Button
                    ghost
                    onClick={() =>
                        this.props.dispatch({ type: LOGOUT_REQUEST })}
                >
                    登出
                </Button>
            </FadeView>
        );
    }
    render() {
        return (
            <Row type="flex" justify="center">
                <Col className="centered-horizontal">
                    {this.renderNav()}
                    <FadeView key="loginPanel" in={_.isNull(this.props.token)}>
                        <Login cancelLogin={this.props.cancelLogin} />
                    </FadeView>
                </Col>

            </Row>
        );
    }

    static get propTypes() {
        return {
            showNav: PropTypes.bool,
            token: PropTypes.string,
        };
    }
}

export default Nav;
