import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { UPDATE_ROUTE_CONFIG } from 'actionTypes';
import PropTypes from 'prop-types';


@connect()
class RouteWithConfig extends PureComponent {
  static propTypes = {
    component: PropTypes.func,
    routeConfig: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  componentWillMount = () => {
    const { component: Component, dispatch, routeConfig } = this.props;
    dispatch({
        type: UPDATE_ROUTE_CONFIG,
        routeConfig: routeConfig || (Component && Component.routeConfig) || {},
    });
  };

  render = () => {
    return <Route {...this.props} />;
  };
}

export default RouteWithConfig;
