import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateRoute, RouteWithConfig } from '../_global/Route';
import FadeView from '../_global/FadeView';
import { TransitionGroup } from 'react-transition-group';
import PlaceHolder from './PlaceHolder';
import Blog from '../Blog';
import Albumn from '../Albumn';
import Lab from '../Lab';
import About from '../About';
import NotFound from '../NotFound';

class Router extends PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    render = () => {
        return (
            <TransitionGroup>
                <FadeView
                    key={this.props.location.pathname}
                    classNames="fadeTranslate"
                    timeout={{
                        enter: 700,
                        exit: 350,
                    }}
                >
                    <Switch
                        key={this.props.location.pathname}
                        location={this.props.location}
                    >
                        <RouteWithConfig
                            path="/"
                            exact
                            component={PlaceHolder}
                        />
                        <PrivateRoute path="/blog" component={Blog} />
                        <PrivateRoute path="/albumn" component={Albumn} />
                        <PrivateRoute path="/lab" component={Lab} />
                        <PrivateRoute path="/about" component={About} />
                        <RouteWithConfig component={NotFound} />
                    </Switch>
                </FadeView>
            </TransitionGroup>
        );
    };
}

export default Router;
