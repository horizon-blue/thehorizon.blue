import React, { Component } from 'react';
import classnames from 'classnames';
import Content from '../_global/Content';

class NotFound extends Component {
  render() {
    const { className } = this.props;
    return (
      <Content className={classnames('NotFound', className)} title="404 - 虚无之地">
        <h1>
          404 <small>Not Found :(</small>
        </h1>
      </Content>
    );
  }
}

export default NotFound;
