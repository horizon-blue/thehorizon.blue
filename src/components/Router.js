import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '@Home';

class Router extends Component {
    render = () => {
        return (
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        );
    };
}

export default Router;
