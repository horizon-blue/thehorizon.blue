import React, { Component } from 'react';
import Content from '../_global/Content';

class Albumn extends Component {
  static routeConfig = {
    title: '相册',
  };
  render() {
    return (
      <Content title={Albumn.routeConfig.title}>
        <h1>
          Albumn
        </h1>
      </Content>
    );
  }
}

export default Albumn;
