import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import Header from './components/Header';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Router />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
