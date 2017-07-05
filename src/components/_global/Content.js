import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import classnames from 'classnames';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Content extends Component {
    render() {
        return (
            <div
                className={classnames(
                    'centered-horizontal',
                    this.props.className
                )}
            >
                <Helmet>
                    <title>{this.props.title} | 天际蓝 - thehorizon.blue</title>
                    <meta
                        name="description"
                        content={this.props.description || this.props.title}
                    />
                </Helmet>
                {this.props.children}
            </div>
        );
    }

    static get propTypes() {
        return {
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        };
    }
}

export default Content;
