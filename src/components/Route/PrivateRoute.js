import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
  };
}

@connect(mapStateToProps)
class PrivateRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          token
            ? <Component {...this.props} />
            : <Redirect
                to={{
                  pathname: '/',
                  state: { from: this.props.location },
                }}
                from={this.props.path}
              />}
      />
    );
  }
}

export default PrivateRoute;
