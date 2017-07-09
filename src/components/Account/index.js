import React, { PureComponent } from 'react';
import { Spin, Row, Col, Button, Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import Content from '../_global/Content';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';
import FadeView from '../_global/FadeView';
import './style.css';

const ADMIN_GROUP_ID = '1';

const getSelfInfo = gql`
  query getSelfInfo {
    user {
      name
      biography
      joinDate
      avatar
      group {
        id
        name
        description
      }
      posts {
        title
        excerpt
        createDate
      }
      comments {
        content
        createDate
      }
    }
  }
`;

@connect()
@graphql(getSelfInfo)
class Account extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      user: PropTypes.object,
    }).isRequired,
  };

  static routeConfig = {
    title: '后花园',
    typingStrings: [
      '嘿，旅者。^1000<br />这里大概是一些我所了解的，^1000关于你的信息。^1000',
      '如果有不准确的地方，^1000<br />可以点击相关区域可以进行修改。',
    ],
  };

  handleLogout = () => {
    this.props.dispatch({ type: LOGOUT_REQUEST });
  };

  renderTopRow = () => {
    const { data: { user } } = this.props;
    return (
      <Row type="flex" className="account-card" justify="center">
        <Col xs={24} sm={6}>
          <div className="centered-horizontal">
            <Avatar className="account-avatar" src={user.avatar}>
              <Icon type="user-add" />
            </Avatar>
          </div>
        </Col>
        <Col xs={24} sm={14}>
          <MediaQuery minDeviceWidth={768}>
            {match =>
              <div
                className={
                  match ? undefined : 'centered-horizontal account-margin-top'
                }
              >
                <h2>{user.name}</h2>
                <p>
                  加入日期：{moment.utc(user.joinDate).format('L')} ({moment.utc(user.joinDate).fromNow()})
                </p>
                <p>
                  用户组：{user.group ? user.group.name : '无'}
                </p>
                <p>
                  简介: {user.biography || '--'}
                </p>
              </div>}
          </MediaQuery>
        </Col>
      </Row>
    );
  };

  renderAdminButtons = match => {
    const { data: { user } } = this.props;
    const isAdmin = user.group && user.group.id === ADMIN_GROUP_ID;
    if (!isAdmin) return null;

    return (
      <Row type="flex" justify="center">
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal">
            <Icon type="edit" />
            <p>博文</p>
          </div>
        </Col>
        <Col
          sm={6}
          xs={12}
          className={classNames('account-card action-button', {
            rightBorder: match,
          })}
        >
          <div className="centered-horizontal">
            <Icon type="picture" />
            <p>涂鸦</p>
          </div>
        </Col>
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal">
            <Icon type="rocket" />
            <p>项目</p>
          </div>
        </Col>
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal">
            <Icon type="setting" />
            <p>管理</p>
          </div>
        </Col>
      </Row>
    );
  };

  renderPersonalInfo = () => {
    const { data: { user } } = this.props;
    if (!user) return <div />;
    return (
      <div>
        {this.renderTopRow()}
        <hr />
        <MediaQuery minDeviceWidth={768}>
          {this.renderAdminButtons}
        </MediaQuery>
        <Row
          type="flex"
          justify="space-between"
          className="account-card account-logout"
        >
          <Col span={24}>
            <div className="centered-horizontal">
              <Button ghost onClick={this.handleLogout}>
                登出
              </Button>
            </div>
          </Col>
        </Row>

      </div>
    );
  };

  render = () => {
    const { data: { loading } } = this.props;
    return (
      <Content title={Account.routeConfig.title}>
        {loading &&
          <Row type="flex" justify="center">
            <Col>
              <Spin tip="加载中..." size="large" />
            </Col>
          </Row>}
        <FadeView in={!loading}>
          {this.renderPersonalInfo()}
        </FadeView>
      </Content>
    );
  };
}

export default Account;
