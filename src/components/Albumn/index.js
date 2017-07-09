import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import Content from '../_global/Content';

class Albumn extends Component {
  static routeConfig = {
    title: '相册',
  };
  render() {
    return (
      <Content title={Albumn.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="施工中..." size="large" />
          </Col>
        </Row>
      </Content>
    );
  }
}

export default Albumn;
