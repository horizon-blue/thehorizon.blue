import React, { Component } from 'react';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';
import anime from 'animejs';

@connect()
class Tabs extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        history: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.animation = anime({
            targets: this.menuItems,
            translateY: [-30, 0],
            delay: function(el, i, l) {
                return i * 100;
            },
        });
    }

    menuItems = [];

    handleClick = e => {
        e.key !== '/logout' && this.props.history.push(e.key);
    };

    render() {
        return (
            <Menu
                mode="horizontal"
                onClick={this.handleClick}
                selectedKeys={[this.props.location.pathname]}
            >
                <Menu.Item key="/blog">
                    <div ref={menuItem => this.menuItems.push(menuItem)}>
                        文字
                    </div>
                </Menu.Item>
                <Menu.Item key="/albumn">
                    <div ref={menuItem => this.menuItems.push(menuItem)}>
                        相册
                    </div>
                </Menu.Item>
                <Menu.Item key="/lab">
                    <div ref={menuItem => this.menuItems.push(menuItem)}>
                        工坊
                    </div>
                </Menu.Item>
                <Menu.Item key="/about">
                    <div ref={menuItem => this.menuItems.push(menuItem)}>
                        关于
                    </div>
                </Menu.Item>
                <Menu.Item key="/logout">
                    <div
                        ref={menuItem => this.menuItems.push(menuItem)}
                        onClick={() =>
                            this.props.dispatch({ type: LOGOUT_REQUEST })}
                    >
                        登出
                    </div>
                </Menu.Item>
            </Menu>
        );
    }
}

export default Tabs;
