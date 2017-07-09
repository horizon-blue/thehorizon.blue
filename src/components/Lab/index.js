import React, { PureComponent } from 'react';
import Content from '../_global/Content';

class Lab extends PureComponent {
  static routeConfig = {
    title: '工坊',
  };

  render = () => {
    return (
      <Content title={Lab.routeConfig.title}>
        <h1>
          Lab
        </h1>
      </Content>
    );
  };
}

export default Lab;
