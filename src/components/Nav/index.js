import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Login from './Login';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';

function mapStateToProps(state, ownProps) {
    return {
        token: state.token,
    };
}

@connect(mapStateToProps)
class Nav extends Component {
    constructor(props) {
        super(props);
    }

    renderNav() {
        return <div key="nav" />;
    }
    render() {
        return (
            <Row type="flex" justify="center">
                <CSSTransitionGroup
                    transitionName="fadeInOut"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >

                    {this.props.token
                        ? this.renderNav()
                        : <Col>
                              <Login
                                  cancelLogin={this.props.cancelLogin}
                                  key="loginPanel"
                              />
                          </Col>}
                </CSSTransitionGroup>
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
