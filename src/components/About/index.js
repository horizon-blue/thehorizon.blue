import React, { Component } from 'react';
import { Spin, Row, Col } from 'antd';
import Content from 'components/_global/Content';

class About extends Component {
  static routeConfig = {
    title: '关于',
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
