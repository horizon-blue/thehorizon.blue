import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Button, Form, Input, Icon, Row, Col, message } from 'antd';
import { connect } from 'react-redux';

import { LOGIN_REQUEST } from '../../store/reducer/actionTypes';

@connect()
@Form.create()
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {};
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                this.props.dispatch({
                    type: LOGIN_REQUEST,
                    username: values.username,
                    password: values.password,
                    onError: error => {
                        message.error(error, 5);
                        this.setState({ loading: false });
                    },
                });
            }
        });
    }

    render() {
        const { getFieldDecorator, resetFields } = this.props.form;
        return (
            <MediaQuery minDeviceWidth={768}>
                {matched =>
                    <Form
                        onSubmit={this.handleSubmit}
                        layout={matched ? 'inline' : 'horizontal'}
                    >
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '你的名字是...？',
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" />}
                                    placeholder="名字"
                                />
                            )}

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '密匙不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" />}
                                    type="password"
                                    placeholder="密匙"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Row type="flex" justify="space-between">
                                <Col>
                                    <Button
                                        ghost
                                        type="primary"
                                        htmlType="submit"
                                        loading={this.state.loading}
                                    >
                                        登录
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        ghost
                                        onClick={this.props.onCancel}
                                        style={{ marginLeft: 10 }}
                                    >
                                        返回
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>}
            </MediaQuery>
        );
    }

    static get propTypes() {
        return {
            dispatch: PropTypes.func.isRequired,
            form: PropTypes.object.isRequired,
            onCancel: PropTypes.func.isRequired,
        };
    }
}

export default Login;
