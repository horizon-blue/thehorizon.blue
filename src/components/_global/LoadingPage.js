import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import Content from './Content';

class LoadingPage extends Component {
  render = () => {
    return (
      <Content title="加载中...">
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="加载中..." size="large" />
          </Col>
        </Row>
      </Content>
    );
  };
}

export default LoadingPage;
