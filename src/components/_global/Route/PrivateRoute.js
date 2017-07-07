import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RouteWithConfig from './RouteWithConfig';

function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
    rehydrated: state.rehydrated,
  };
}

@connect(mapStateToProps)
class PrivateRoute extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    rehydrated: PropTypes.bool,
    token: PropTypes.string,
  };

  render() {
    const { component: Component, token, rehydrated, ...rest } = this.props;
    return (
      <RouteWithConfig
        {...rest}
        routeConfig={Component.routeConfig}
        render={props =>
          rehydrated
            ? token
              ? <Component {...props} />
              : <Redirect
                  to={{
                    pathname: '/',
                    state: { from: this.props.location },
                  }}
                  from={this.props.path}
                />
            : null}
      />
    );
  }
}

export default PrivateRoute;
