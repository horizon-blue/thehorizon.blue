import React, { Component } from 'react';
import { Row, Col } from 'antd';
import classnames from 'classnames';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';

class Content extends Component {
    render() {
        return (
            <div
                className={classnames(
                    'centered-horizontal',
                    this.props.className
                )}
            >
                {this.props.children}
            </div>
        );
    }

    static get propTypes() {
        return {
            title: PropTypes.string.isRequired,
        };
    }
}

export default Content;
