import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Content from '../_global/Content';

class NotFound extends Component {
  static routeConfig = {
    typingStrings: ['欢迎来到...^1000<br />嗯？^1000你是怎么走到这里来的？'],
    title: '404 - 虚无之地',
  };

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Content title={NotFound.routeConfig.title}>
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
}

export default NotFound;
