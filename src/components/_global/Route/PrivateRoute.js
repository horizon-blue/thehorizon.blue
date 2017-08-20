import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { gql, withApollo } from 'react-apollo';
import RouteWithConfig from './RouteWithConfig';
import LoadingPage from '@_global/LoadingPage';
import { SESSION_EXPIRED } from 'actionTypes';

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

@withApollo
@connect(mapStateToProps)
class TempPage extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string,
    redirect: PropTypes.string,
    client: PropTypes.object.isRequired,
  };

  state = { checking: true };

  componentWillMount = () => {
    const { client, token, redirect, history, dispatch } = this.props;
    if (!token) {
      if (redirect) history.push(redirect);
      this.setState({ checking: false });
    } else {
      client.networkInterface
        .query({
          query: validateToken,
        })
        .then(res => {
          if (!res.data.sessionIsValid) {
            dispatch({ type: SESSION_EXPIRED });
            if (redirect) history.push(redirect);
          }
          this.setState({ checking: false });
        });
    }
  };

  render = () => {
    const { component: Component, token, ...rest } = this.props;
    if (this.state.checking) return <LoadingPage />;
    return <Component {...rest} />;
  };
}

class PrivateRoute extends PureComponent {
  static propTypes = {
    component: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  renderPage = props => {
    const { component: Component } = this.props;
    return <TempPage component={Component} {...props} />;
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
