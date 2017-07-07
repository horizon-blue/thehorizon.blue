import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import classnames from 'classnames';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Content extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>{this.props.title} | 天际蓝 - thehorizon.blue</title>
                    <meta
                        name="description"
                        content={this.props.description || this.props.title}
                    />
                </Helmet>
                <Row justify="center" type="flex">
                    <Col
                        xs={22}
                        sm={18}
                        lg={14}
                        className={this.props.className}
                    >
                        {this.props.children}
                    </Col>
                </Row>
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
