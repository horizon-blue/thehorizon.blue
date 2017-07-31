import React, { PureComponent } from 'react';
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
    location: PropTypes.object,
    history: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string,
    redirect: PropTypes.string,

    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      sessionIsValid: PropTypes.bool,
    }).isRequired,
  };

  state = {};

  componentWillReceiveProps = nextProps => {
    if (!this.props.token) {
      if (this.props.redirect) this.props.history.push(this.props.redirect);
    } else if (nextProps.data.sessionIsValid === false) {
      this.props.dispatch({ type: LOGOUT_REQUEST });
      if (this.props.redirect) this.props.history.push(this.props.redirect);
    }
  };

  render = () => {
    const { component: Component, data: { loading }, ...rest } = this.props;
    if (loading) return <LoadingPage />;
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
