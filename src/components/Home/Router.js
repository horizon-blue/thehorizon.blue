import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { RouteTransition } from 'react-router-transition';
import { CSSTransitionGroup } from 'react-transition-group';
import About from '../About';
import NotFound from '../NotFound';
import Login from '../Login';

import { PrivateRoute } from '../Route';

class Router extends Component {
    constructor(props) {
        super(props);
        this.renderLogin = this.renderLogin.bind(this);
    }
    renderLogin() {
        return (
            <div className="centered-horizontal">
                <CSSTransitionGroup
                    transitionName="fadeInOut"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {this.props.showLogin && <Login />}
                </CSSTransitionGroup>
            </div>
        );
    }
    render() {
        return (
            <RouteTransition
                pathname={this.props.location.pathname}
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
            >
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={this.renderLogin}
                        showLogin={this.props.showLogin}
                    />
                    <PrivateRoute path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
            </RouteTransition>
        );
    }
}

export default Router;
