import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import { Button, Form, Input, Icon, Row, Col, message } from 'antd';
import { connect } from 'react-redux';

import { LOGIN_REQUEST } from 'actionTypes';

@connect()
@Form.create()
class Login extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired,
        cancelLogin: PropTypes.func.isRequired,
    };

    state = {};

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ loading: true });
                this.props.dispatch({
                    type: LOGIN_REQUEST,
                    name: values.name,
                    password: values.password,
                    onLoginComplete: error => {
                        this.setState({ loading: false });
                        if (error) message.error(error, 5);
                        else {
                            message.success('验证成功。', 5);
                        }
                    },
                });
            }
        });
    };

    render = () => {
        const { getFieldDecorator } = this.props.form;
        return (
            <MediaQuery minDeviceWidth={768}>
                {matched =>
                    <Form
                        onSubmit={this.handleSubmit}
                        layout={matched ? 'inline' : 'horizontal'}
                    >
                        <Form.Item>
                            {getFieldDecorator('name', {
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
                                        onClick={this.props.cancelLogin}
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
    };
}

export default Login;
