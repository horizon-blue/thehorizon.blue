import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateRoute } from 'components/_global/Route';
import FadeView from 'components/_global/FadeView';
import { TransitionGroup } from 'react-transition-group';
import PlaceHolder from './PlaceHolder';
import Blog from 'components/Blog';
import Albumn from 'components/Albumn';
import Lab from 'components/Lab';
import About from 'components/About';
import Account from 'components/Account';
import Registration from 'components/Registration';
import NotFound from 'components/NotFound';

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
                    timeout={350}
                >
                    <div>
                        <Switch location={this.props.location}>
                            <PrivateRoute
                                path="/"
                                exact
                                component={PlaceHolder}
                            />
                            <PrivateRoute path="/blog" component={Blog} />
                            <PrivateRoute path="/albumn" component={Albumn} />
                            <PrivateRoute path="/lab" component={Lab} />
                            <PrivateRoute path="/about" component={About} />
                            <PrivateRoute
                                path="/account"
                                component={Account}
                                redirect="/"
                            />
                            <PrivateRoute
                                path="/a/super/secrete/path/that/nobody/can/find/:link"
                                component={Registration}
                            />
                            <PrivateRoute path="/404" component={NotFound} />
                            <PrivateRoute component={NotFound} />
                        </Switch>
                    </div>
                </FadeView>
            </TransitionGroup>
        );
    };
}

export default Router;
