import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Home from './Home';
import { RouteWithConfig } from './_global/Route';

class Router extends Component {
    render() {
        return (
            <Switch>
                <RouteWithConfig path="/" component={Home} />
            </Switch>
        );
    }
}

export default Router;
