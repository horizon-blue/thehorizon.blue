import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute, RouteWithConfig } from '../_global/Route';
import PlaceHolder from './PlaceHolder';
import Blog from '../Blog';
import Albumn from '../Albumn';
import Lab from '../Lab';
import About from '../About';
import NotFound from '../NotFound';

class Router extends Component {
    render() {
        return (
            <Switch>
                <RouteWithConfig path="/" exact component={PlaceHolder} />
                <PrivateRoute path="/blog" component={Blog} />
                <PrivateRoute path="/albumn" component={Albumn} />
                <PrivateRoute path="/lab" component={Lab} />
                <PrivateRoute path="/about" component={About} />
                <RouteWithConfig component={NotFound} />
            </Switch>
        );
    }
}

export default Router;
