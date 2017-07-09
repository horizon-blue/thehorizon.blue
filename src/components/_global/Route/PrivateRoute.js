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
  mutation validateToken {
    sessionIsValid
  }
`;

function mapStateToProps(state, ownProps) {
  return {
    token: state.token,
    rehydrated: state.rehydrated,
  };
}

@connect(mapStateToProps)
@graphql(validateToken)
class TempPage extends PureComponent {
  static propTypes = {
    rehydrated: PropTypes.bool,
    mutate: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
    token: PropTypes.string,
    path: PropTypes.string.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  };

  state = {};

  componentWillReceiveProps = nextProps => {
    if (nextProps.token && !this.state.validating) {
      this.setState({ validating: true });
      this.props
        .mutate()
        .then(({ data: sessionIsValid }) => {
          if (!sessionIsValid) this.props.dispatch({ type: LOGOUT_REQUEST });
          this.setState({ sessionIsValid });
        })
        .catch(error => {
          console.log('validation error', error);
          message.error(error.message);
          // this.props.dispatch({ type: LOGOUT_REQUEST });
        });
    }
  };

  render = () => {
    const { component: Component, rehydrated, token, ...rest } = this.props;
    const { sessionIsValid } = this.state;
    if ((rehydrated && !token) || sessionIsValid === false)
      return (
        <Redirect
          to={{
            pathname: '/',
            state: { from: this.props.location },
          }}
          from={this.props.path}
        />
      );
    if (sessionIsValid) return <Component {...rest} />;
    return <LoadingPage />;
  };
}

class PrivateRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    location: PropTypes.object,
  };

  render = () => {
    const { component: Component, ...rest } = this.props;
    return (
      <RouteWithConfig
        {...rest}
        routeConfig={Component.routeConfig}
        render={props =>
          <TempPage component={Component} path={this.props.path} {...props} />}
      />
    );
  };
}

export default PrivateRoute;
