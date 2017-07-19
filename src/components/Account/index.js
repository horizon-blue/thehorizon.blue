import React, { PureComponent } from 'react';
import { Spin, Row, Col, Button, Icon, Input, message } from 'antd';
import { connect } from 'react-redux';
import Content from '../_global/Content';
import PropTypes from 'prop-types';
import { gql, graphql } from 'react-apollo';
import classNames from 'classnames';
import { Route, Switch, Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { LOGOUT_REQUEST } from '../../store/reducer/actionTypes';
import FadeView from '../_global/FadeView';
import UploadAvatarModal from './UploadAvatarModal';
import { IMG_ROOT, ADMIN_GROUP_ID } from '../../constants/api';
import './style.css';
import LoadableEditor from '../PostEditor';

const getSelfInfo = gql`
  query getSelfInfo {
    user {
      id
      name
      biography
      joinDate
      avatar
      group {
        id
        name
      }
    }
  }
`;

const updateUserName = gql`
    mutation updateUserName($name: String!) {
        UpdateUserInfo(name: $name) {
            success
        }
    }
`;

@connect()
@graphql(getSelfInfo)
@graphql(updateUserName)
class Account extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      refetch: PropTypes.func.isRequired,
      user: PropTypes.object,
    }).isRequired,
    history: PropTypes.object.isRequired,
    mutate: PropTypes.func.isRequired,
  };

  static routeConfig = {
    title: '后花园',
    typingStrings: [
      '嘿，旅者。^1000<br />这里大概是一些我所了解的，^1000关于你的信息。^1000',
      '如果有不准确的地方，^1000<br />可以点击相关区域可以进行修改。',
    ],
  };

  state = { avatarVModalVisible: false };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.nameInput) this.nameInput.focus();
  };

  handleLogout = () => {
    this.props.dispatch({ type: LOGOUT_REQUEST });
  };

  haneldInfoUpdate = () => {
    this.props.data.refetch();
  };

  handleClickName = () => {
    this.setState({ name: this.props.data.user.name, editingName: true });
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  submitChangedName = () => {
    if (this.state.name !== this.props.data.user.name) {
      this.props
        .mutate({
          variables: { name: this.state.name },
        })
        .then(({ data }) => {
          data.UpdateUserInfo.success
            ? message.success('设置成功', 5)
            : message.error('设置失败', 5);
          this.haneldInfoUpdate();
        })
        .catch(error => {
          console.log('setting info', error);
          this.setState({ settingInfo: false });
          message.error(error.message);
        });
    }
    this.setState({ editingName: false });
  };

  renderTopRow = () => {
    const { data: { user } } = this.props;
    return (
      <Row type="flex" className="account-card" justify="center">
        <Col xs={24} sm={6}>
          <div className="centered-horizontal" onClick={this.openAvatarModal}>
            <div className="account-avatar">
              {user.avatar
                ? <img
                    src={IMG_ROOT + user.avatar}
                    alt="avatar"
                    className="avatar-img-in-setting-page"
                  />
                : <Icon type="user-add" />}

            </div>
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
                {this.state.editingName
                  ? <Input
                      ref={nameInput => (this.nameInput = nameInput)}
                      value={this.state.name}
                      onChange={this.handleChangeName}
                      onBlur={this.submitChangedName}
                      defaultValue={user.name}
                      onPressEnter={this.submitChangedName}
                      className="changing-name-input"
                    />
                  : <h2 onClick={this.handleClickName}>{user.name}</h2>}
                <p>
                  加入日期：{moment.utc(user.joinDate).local().format('L')}（{moment.utc(user.joinDate).fromNow()}）
                </p>
                <p>
                  用户组：{user.group ? user.group.name : '无'}
                </p>
                <p>
                  简介：{user.biography || '--'}
                </p>
              </div>}
          </MediaQuery>
          <UploadAvatarModal
            visible={this.state.avatarVModalVisible}
            closeModal={this.closeAvatarModal}
            onSubmit={this.haneldInfoUpdate}
          />
        </Col>
      </Row>
    );
  };

  createPost = e => {
    const { history } = this.props;
    history.push('/account/new-post');
  };

  uploadImage = e => {
    const { history } = this.props;
    history.push('/account/upload-image');
  };

  addProject = e => {
    const { history } = this.props;
    history.push('/account/add-project');
  };

  manageSite = e => {
    const { history } = this.props;
    history.push('/account/admin');
  };

  closeAvatarModal = () => {
    this.setState({ avatarVModalVisible: false });
  };
  openAvatarModal = () => {
    this.setState({ avatarVModalVisible: true });
  };

  isAdmin = () => {
    const { data: { user } } = this.props;
    return user && user.group && user.group.id === ADMIN_GROUP_ID;
  };

  renderAdminButtons = match => {
    if (!this.isAdmin()) return null;

    return (
      <Row type="flex" justify="center">
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal" onClick={this.createPost}>
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
          <div className="centered-horizontal" onClick={this.uploadImage}>
            <Icon type="picture" />
            <p>涂鸦</p>
          </div>
        </Col>
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal" onClick={this.addProject}>
            <Icon type="rocket" />
            <p>项目</p>
          </div>
        </Col>
        <Col sm={6} xs={12} className="account-card action-button">
          <div className="centered-horizontal" onClick={this.manageSite}>
            <Icon type="setting" />
            <p>管理</p>
          </div>
        </Col>
      </Row>
    );
  };

  renderPersonalInfo = () => {
    const { data: { user, loading } } = this.props;
    if (!user) return <div />;
    return (
      <FadeView in={!loading}>
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
      </FadeView>
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
        <Switch>
          <Route path="/account" exact render={this.renderPersonalInfo} />
          {this.isAdmin() &&
            <Route path="/account/new-post" exact component={LoadableEditor} />}
          <Redirect to="/404" />
        </Switch>
      </Content>
    );
  };
}

export default Account;
