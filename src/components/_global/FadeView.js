import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
class FadeView extends Component {
    render() {
        return (
            <CSSTransition
                timeout={500}
                classNames="fadeInOut"
                mountOnEnter={true}
                unmountOnExit={true}
                {...this.props}
            >
                {this.props.children}
            </CSSTransition>
        );
    }
}

export default FadeView;
