import React, { Component } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';
import Content from '../_global/Content';

class NotFound extends Component {
  render() {
    const { className } = this.props;
    return (
      <Content
        className={classnames('NotFound', className)}
        title={NotFound.routeConfig.title}
      >
        <article
          className="centered-horizontal"
          style={{ marginBottom: '3vh' }}
        >
          <p>在这片领域上，并没有你要寻找的内容。</p>
          <p>不考虑去别处转转吗？</p>
        </article>
        <div className="centered-horizontal">
          <Button ghost onClick={() => this.props.history.goBack()}>返回</Button>
        </div>
      </Content>
    );
  }
  static get routeConfig() {
    return {
      typingStrings: ['欢迎来到...^1000<br />嗯？^1000你是怎么走到这里来的？'],
      title: '404 - 虚无之地',
    };
  }
}

export default NotFound;
