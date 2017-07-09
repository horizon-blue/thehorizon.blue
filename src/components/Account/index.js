import React, { PureComponent } from 'react';
import { Spin, Row, Col, Button } from 'antd';
import { connect } from 'react-redux';
import Content from '../_global/Content';
import PropTypes from 'prop-types';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';

@connect()
class Account extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static routeConfig = {
    title: '个人信息',
  };

  handleLogout = () => {
    this.props.dispatch({ type: LOGOUT_REQUEST });
  };

  render = () => {
    return (
      <Content title={Account.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="施工中..." size="large" />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ marginTop: 10 }}>
          <Col>
            <Button ghost onClick={this.handleLogout}>
              登出
            </Button>
          </Col>
        </Row>
      </Content>
    );
  };
}

export default Account;
