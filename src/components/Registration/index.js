import React, { PureComponent } from 'react';
import { Spin, Row, Col } from 'antd';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Content from '../_global/Content';
import RegistrationForm from './RegistrationForm';

const validateLink = gql`
  query validateLink($link: String!) {
    invitationIsValid(link: $link)
  }
`;

@graphql(validateLink, {
  options: ({ match }) => ({ variables: { ...match.params } }),
})
class Registration extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      invitationIsValid: PropTypes.bool,
    }).isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object,
  };

  static routeConfig = {
    title: '迷宫入口',
    typingStrings: [
      '...没想到竟然有人会来到这里呢。^1000<br />就如名字一样，^1000这里是天空的尽头，^1000天际。',
      '这里也是一个普通的博客，^1000<br />一个自称为“天际”的中二病患者的栖息地。',
      '...这里堆积着的，^1000只有一些杂思乱想，^1000和一些无处可去的记忆。',
      '总之，^1000欢迎来到这里。^1000<br />欢迎来看这场...^1000属于天际的狂欢。',
    ],
  };

  renderContent = () => {
    const {
      data: { loading, invitationIsValid },
      match: { params },
      history,
    } = this.props;
    if (loading) return <Spin tip="加载中..." size="large" />;
    if (!invitationIsValid) return <Redirect to="/404" />;
    return <RegistrationForm link={params.link} history={history} />;
  };

  render = () => {
    return (
      <Content title={Registration.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col xs={24} sm={20} md={16}>
            {this.renderContent()}
          </Col>
        </Row>
      </Content>
    );
  };
}

export default Registration;
