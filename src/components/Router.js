import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'components/Home';

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
