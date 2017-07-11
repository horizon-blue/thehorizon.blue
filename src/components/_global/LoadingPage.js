import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Content from './Content';

class LoadingPage extends Component {
  static propTypes = {
    message: PropTypes.string,
  };
  render = () => {
    const { message } = this.props;
    return (
      <Content title={message || '加载中...'}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip={message || '加载中...'} size="large" />
          </Col>
        </Row>
      </Content>
    );
  };
}

export default LoadingPage;
