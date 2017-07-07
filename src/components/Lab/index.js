import React, { Component } from 'react';
import classnames from 'classnames';
import Content from '../_global/Content';

class Lab extends Component {
  render() {
    const { className } = this.props;
    return (
      <Content
        className={classnames('Lab', className)}
        title={Lab.routeConfig.title}
      >
        <h1>
          Lab
        </h1>
      </Content>
    );
  }

  static get routeConfig() {
    return {
      title: '工坊',
    };
  }
}

export default Lab;
