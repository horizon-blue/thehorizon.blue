import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';

@connect()
class PrivateRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="fadeInOut"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <Route
          {...rest}
          render={props =>
            false
              ? <Component {...this.props} />
              : <Redirect to="/" from={this.props.path} />}
        />
      </CSSTransitionGroup>
    );
  }
}

export default PrivateRoute;
