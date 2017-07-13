import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withApollo, gql, graphql } from 'react-apollo';
import { Form, Input, Button, Tooltip, message } from 'antd';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { AUTH_SUCCESS } from '../../store/reducer/actionTypes';

const FormItem = Form.Item;

const checkUserName = gql`
  query checkUserName($name: String!) {
    usernameIsAvailable(name: $name)
  }
`;

const CreateNewUser = gql`
    mutation CreateNewUser($name: String!, $password: String!, $link: String!) {
        CreateNewUser(name: $name, password: $password, link: $link) {
            success
            token
        }
    }
`;

@withApollo
@graphql(CreateNewUser)
@Form.create()
@connect()
class RegistrationForm extends PureComponent {
    static propTypes = {
        form: PropTypes.object.isRequired,
        client: PropTypes.object.isRequired,
        link: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        mutate: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
    };

    state = {
        confirmDirty: false,
    };

    componentWillMount = () => {
        this.linkInfo = jwtDecode(this.props.link);
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({ registering: true });
                const { mutate, link, history } = this.props;
                mutate({
                    variables: {
                        name: values.name,
                        password: values.password,
                        link,
                    },
                })
                    .then(({ data }) => {
                        data.CreateNewUser.success
                            ? message.success('注册成功，欢迎成为天际的一员', 5)
                            : message.error('注册失败', 5);
                        this.setState({ registering: false });
                        this.props.dispatch({
                            type: AUTH_SUCCESS,
                            token: data.CreateNewUser.token,
                        });
                        history.push('/');
                    })
                    .catch(error => {
                        console.log('user registration', error);
                        this.setState({ registering: false });
                        message.error(error.message);
                    });
            }
        });
    };

    checkName = (rule, value, callback) => {
        const { client } = this.props;
        if (value) {
            client.networkInterface
                .query({
                    query: checkUserName,
                    variables: { name: value },
                })
                .then(
                    res =>
                        res.data.usernameIsAvailable
                            ? callback()
                            : callback('用户名已被占用')
                );
        } else {
            callback();
        }
    };

    checkConfirm = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }

        if (value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/.test(value)) {
            callback('密码强度太低');
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    render = () => {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="邮箱">
                    <Input disabled value={this.linkInfo.email} />
                </FormItem>
                <FormItem {...formItemLayout} label="用户名" hasFeedback>
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: '用户名不能为空',
                            },
                            {
                                validator: this.checkName,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    hasFeedback
                    label={
                        <Tooltip title="8到16位，至少包含1位数字和1位字母">
                            <span>
                                密码
                            </span>
                        </Tooltip>
                    }
                >
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            {
                                validator: this.checkConfirm,
                            },
                        ],
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入密码',
                            },
                            {
                                validator: this.checkPassword,
                            },
                        ],
                    })(
                        <Input
                            type="password"
                            onBlur={this.handleConfirmBlur}
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        ghost
                        loading={this.state.registering}
                    >
                        开启通往新世界的大门
                    </Button>
                </FormItem>
            </Form>
        );
    };
}

export default RegistrationForm;
