import React, { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

class FadeView extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
            PropTypes.array,
        ]),
    };

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
