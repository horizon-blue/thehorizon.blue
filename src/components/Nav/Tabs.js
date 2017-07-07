import React, { Component } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';
import anime from 'animejs';

@connect()
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
            current: e.key,
        });
        e.key !== 'logout' && this.props.history.push('/' + e.key);
    }

    componentWillMount() {}
    render() {
        return (
            <Menu
                mode="horizontal"
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
            >
                <Menu.Item key="blog">
                    文字
                </Menu.Item>
                <Menu.Item key="albumn">
                    涂鸦
                </Menu.Item>
                <Menu.Item key="lab">
                    工坊
                </Menu.Item>
                <Menu.Item key="about">
                    关于
                </Menu.Item>
                <Menu.Item key="logout">
                    <div
                        onClick={() =>
                            this.props.dispatch({ type: LOGOUT_REQUEST })}
                    >
                        登出
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    static get propTypes() {
        return {
            dispatch: PropTypes.func.isRequired,
            history: PropTypes.object.isRequired,
        };
    }
}

export default Tabs;
