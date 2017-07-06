import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import About from '../About';
import NotFound from '../NotFound';
import Login from '../Login';
import { PrivateRoute, RouteWithConfig } from '../_global/Route';

function mapStateToProps(state, ownProps) {
    return {
        token: state.token,
    };
}

@connect(mapStateToProps)
class Router extends Component {
    constructor(props) {
        super(props);
        this.renderLogin = this.renderLogin.bind(this);
    }
    renderLogin(props) {
        const { from } = props.location.state || {
            from: { pathname: '/about' },
        };

        return (
            <div className="centered-horizontal">
                <CSSTransitionGroup
                    transitionName="fadeInOut"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {this.props.showLogin &&
                        (this.props.token
                            ? <Redirect to={from} push={true} />
                            : <Login
                                  key="loginPanel"
                                  cancelLogin={this.props.cancelLogin}
                                  submitLogin={() =>
                                      props.history.push(from.pathname)}
                              />)}
                </CSSTransitionGroup>
            </div>
        );
    }
    render() {
        const { location } = this.props;
        return (
            <CSSTransitionGroup
                transitionName="fadeInOut"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <Switch key={location.key} location={location}>
                    <Route
                        exact
                        path="/"
                        render={this.renderLogin}
                        showLogin={this.props.showLogin}
                    />
                    <PrivateRoute path="/about" component={About} />
                    <RouteWithConfig component={NotFound} />
                </Switch>
            </CSSTransitionGroup>
        );
    }
}

export default Router;
