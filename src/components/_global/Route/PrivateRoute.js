import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import RouteWithConfig from './RouteWithConfig';
import LoadingPage from '../LoadingPage';
import { LOGOUT_REQUEST } from '../../../store/reducer/actionTypes';

const validateToken = gql`
  query validateToken {
    sessionIsValid
  }
`;

function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
  };
}

@graphql(validateToken, {
  options: { fetchPolicy: 'network-only' },
})
@connect(mapStateToProps)
class TempPage extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string,

    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      sessionIsValid: PropTypes.array,
    }).isRequired,
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.data.sessionIsValid === false) {
      this.this.props.dispatch({ type: LOGOUT_REQUEST });
      message.error('登录状态已过期', 5);
    }
  };

  render = () => {
    const {
      component: Component,
      data: { loading, sessionIsValid },
      ...rest
    } = this.props;
    if (loading) return <LoadingPage />;
    if (sessionIsValid === false)
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: this.props.location },
          }}
          from={this.props.path}
        />
      );
    return <Component {...rest} />;
  };
}

class PrivateRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.object,
  };

  renderPage = props => {
    const { component: Component } = this.props;
    return <TempPage component={Component} path={this.props.path} {...props} />;
  };

  render = () => {
    const { component: Component, ...rest } = this.props;
    return (
      <RouteWithConfig
        {...rest}
        routeConfig={Component.routeConfig}
        render={this.renderPage}
      />
    );
  };
}

export default PrivateRoute;
