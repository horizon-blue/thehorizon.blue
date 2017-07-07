import React, { Component } from 'react';
import classnames from 'classnames';
import Content from '../_global/Content';

class Albumn extends Component {
  render() {
    const { className } = this.props;
    return (
      <Content
        className={classnames('Albumn', className)}
        title={Albumn.routeConfig.title}
      >
        <h1>
          Albumn
        </h1>
      </Content>
    );
  }

  static get routeConfig() {
    return {
      title: '相册',
    };
  }
}

export default Albumn;
