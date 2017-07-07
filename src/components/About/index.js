import React, { Component } from 'react';
import Content from '../_global/Content';

class About extends Component {
  static get routeConfig() {
    return {
      title: '关于',
    };
  }
  render() {
    return (
      <Content title={About.routeConfig.title}>
        <h1>
          About
        </h1>
      </Content>
    );
  }
}
export default About;
