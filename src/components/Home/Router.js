import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import About from '../About';
import NotFound from '../NotFound';
import { PrivateRoute, RouteWithConfig } from '../_global/Route';

class Router extends Component {
    render() {
        const { location } = this.props;
        return (
            <CSSTransitionGroup
                transitionName="fadeInOut"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
            >
                <Switch key={location.key} location={location}>
                    <PrivateRoute path="/about" component={About} />
                    <RouteWithConfig path="/:foo+" component={NotFound} />
                </Switch>
            </CSSTransitionGroup>
        );
    }
}

export default Router;
