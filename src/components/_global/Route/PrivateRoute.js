import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RouteWithConfig from './RouteWithConfig';

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
      <RouteWithConfig
        {...rest}
        routeConfig={Component.routeConfig}
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
  static get propTypes() {
    return {
      component: PropTypes.func.isRequired,
      path: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
    };
  }
}

export default PrivateRoute;
