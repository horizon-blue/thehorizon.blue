import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

class Content extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.func,
            PropTypes.array,
        ]),
    };

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
}

export default Content;
