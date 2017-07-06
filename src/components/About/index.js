import React, { Component } from 'react';
import classnames from 'classnames';
import Content from '../_global/Content';

export default class About extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className } = this.props;
    return (
      <Content
        className={classnames('About', className)}
        title={About.routeConfig.title}
      >
        <h1>
          About
        </h1>
      </Content>
    );
  }

  static get routeConfig() {
    return {
      title: '关于',
    };
  }
}
