import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

class TransitionRoute extends Component {
    render() {
        return (
            <CSSTransitionGroup
                transitionName="fadeInOut"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <Route {...this.props} />
            </CSSTransitionGroup>
        );
    }
}

export default TransitionRoute;
