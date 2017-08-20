import React, { PureComponent } from 'react';
import { Spin, Row, Col } from 'antd';
import Content from '@_global/Content';

class Lab extends PureComponent {
  static routeConfig = {
    title: '工坊',
  };

  render = () => {
    return (
      <Content title={Lab.routeConfig.title}>
        <Row type="flex" justify="center">
          <Col>
            <Spin tip="施工中..." size="large" />
          </Col>
        </Row>
      </Content>
    );
  };
}

export default Lab;
