import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import classnames from 'classnames';
import Router from './Router';
import Header from './components/Header';

class App extends Component {
    render() {
        const { className, ...props } = this.props;
        return (
            <BrowserRouter>
                <div className={classnames('App', className)} {...props}>
                    <Header />
                    <Router />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
