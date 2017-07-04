import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Icon } from 'antd';
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
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: LOGIN_REQUEST,
                    username: values.username,
                    password: values.password,
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} layout="inline">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '你的名字是...？',
                            },
                        ],
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="名字" />
                    )}

                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密匙不能为空' }],
                    })(
                        <Input
                            prefix={
                                <Icon type="lock" style={{ fontSize: 13 }} />
                            }
                            type="password"
                            placeholder="密匙"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button ghost type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button ghost>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    static get propTypes() {
        return {
            dispatch: PropTypes.func.isRequired,
            form: PropTypes.object.isRequired,
        };
    }
}

export default Login;
