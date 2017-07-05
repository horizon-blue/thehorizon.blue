import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import About from '../About';
import NotFound from '../NotFound';

import { PrivateRoute, TransitionRoute } from '../Route';

class Router extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/about" component={About} />
                <TransitionRoute path="/:pathNotFound+" component={NotFound} />
            </Switch>
        );
    }
}

export default Router;
