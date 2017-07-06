import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import About from '../About';
import NotFound from '../NotFound';
import { PrivateRoute, RouteWithConfig } from '../_global/Route';
import MediaQuery from 'react-responsive';

class Empty extends Component {
    render() {
        return <div />;
    }
    static get routeConfig() {
        return {
            title: (
                <span>
                    天际蓝
                    <MediaQuery minDeviceWidth={768}>
                        {match => (match ? <span> | </span> : <br />)}
                    </MediaQuery>
                    thehorizon.blue
                </span>
            ),
            typingStrings: [
                '啊。^1000早上好，迷途中的旅者。^1000<br />欢迎来到天空的尽头。^1000',
                '前方是名为天际的一片虚无之地。^1000<br />藤蔓肆虐，荆棘丛生。',
                '那是不应被打扰的一片领域。',
                '因此^1000，请回吧。^500',
                '嗯？^1000执意前行吗？^1000<br />...真是没办法呢。^1000<br />那么^1000，请出示你的信物。^500',
                '祝你旅途愉快。',
            ],
        };
    }
}

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
                    <RouteWithConfig path="/" exact component={Empty} />
                    <PrivateRoute path="/about" component={About} />
                    <RouteWithConfig component={NotFound} />
                </Switch>
            </CSSTransitionGroup>
        );
    }
}

export default Router;
