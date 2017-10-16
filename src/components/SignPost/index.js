import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import Content from '@_global/Content';

class About extends Component {
  static routeConfig = {
    title: '空港',
    typingStrings: ['你的下一站是哪里呢？'],
  };

  render = () => {
    return (
      <Content title={About.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="施工中..." size="large" />
          </Col>
        </Row>
      </Content>
    );
  };
}
export default About;
