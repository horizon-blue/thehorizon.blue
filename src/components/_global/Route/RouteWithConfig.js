import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as routeActions from './route.actions';

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(routeActions, dispatch) };
}

@connect(undefined, mapDispatchToProps)
class RouteWithConfig extends Component {
  componentWillMount() {
    const { component: Component, actions, routeConfig } = this.props;
    actions.updateConfig(
      (Component && Component.routeConfig) || routeConfig || {}
    );
  }
  render() {
    return <Route {...this.props} />;
  }
  static get propTypes() {
    return {
      component: PropTypes.func,
      routeConfig: PropTypes.object,
    };
  }
}

export default RouteWithConfig;
